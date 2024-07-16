
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "antarctic";

ALTER SCHEMA "antarctic" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "antarctic"."get_expedition"("p_cruise_line" "text", "p_name" "text") RETURNS TABLE("id" integer, "name" character varying, "description" "text"[], "highlights" "text"[], "duration" character varying, "startingPrice" numeric, "website" "text", "photoUrl" "text", "cruiseLine" "jsonb", "gallery" "json", "vessels" "jsonb", "itineraries" "json", "departures" "jsonb", "extensions" "jsonb", "otherExpeditions" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  WITH vessels AS (
    SELECT
      v.vessel_id,
      v.name,
      jsonb_build_object(
        'id', v.vessel_id,
        'name', v.name,
        'description', v.description,
        'cabins', v.cabins,
        'capacity', v.capacity,
        'photoUrl', v.photo_url,
        'website', v.website
      ) AS vessel
    FROM antarctic.vessels v
  ),
  itineraries AS (
    SELECT
      i.itinerary_id,
      i.expedition_id,
      COALESCE(i.name, 'Itinerary ' || i.itinerary_id) AS name,
      i.departing_from,
      i.arriving_at,
      i.duration,
      i.map_url,
      json_agg(DISTINCT jsonb_build_object(
        'id', d.detail_id,
        'day', d.day,
        'header', d.header,
        'content', d.content
      )) AS schedule
    FROM antarctic.itineraries i
    JOIN antarctic.itinerary_details d ON d.itinerary_id = i.itinerary_id
    GROUP BY i.itinerary_id
  ),
  departures AS (
    SELECT
      i.itinerary_id,
      d.departure_id,
      d.vessel_id,
      d.discounted_price,
      d.starting_price,
      jsonb_build_object(
        'startDate', d.start_date,
        'endDate', d.end_date
      ) AS departures
    FROM itineraries i
    LEFT JOIN antarctic.departures d ON d.itinerary_id = i.itinerary_id
    LEFT JOIN vessels v ON v.vessel_id = d.vessel_id
    WHERE d.starting_price IS NOT NULL
  ),
  extensions AS (
    SELECT
      exp.expedition_id,
      jsonb_build_object(
        'name', ext.name,
        'duration', ext.duration,
        'startingPrice', ext.starting_price,
        'photoUrl', ext.photo_url,
        'website', ext.website
      ) AS extension
    FROM antarctic.expeditions_extensions ee
    JOIN antarctic.extensions ext ON ext.extension_id = ee.extension_id
    JOIN antarctic.expeditions exp ON exp.expedition_id = ee.expedition_id
  ),
  expeditions AS (
    SELECT
      c.cruise_line_id,
      jsonb_build_object(
        'id', e.expedition_id,
        'name', e.name,
        'duration', CASE 
          WHEN MIN(i.duration) = MAX(i.duration) THEN 
            MIN(i.duration)::TEXT
          ELSE 
            (MIN(i.duration) || '-' || MAX(i.duration))
        END,
        'startDate', min(d.start_date),
        'startingPrice', MIN(COALESCE(d.discounted_price, d.starting_price)),
        'photoUrl', e.photo_url        
      ) AS expedition
    FROM antarctic.expeditions e
    JOIN antarctic.cruise_lines c ON c.cruise_line_id = e.cruise_line_id
    LEFT JOIN antarctic.itineraries i ON i.expedition_id = e.expedition_id
    LEFT JOIN antarctic.departures d ON d.expedition_id = e.expedition_id
    WHERE c.name = p_cruise_line AND e.name <> p_name
    GROUP BY e.expedition_id, c.cruise_line_id
    LIMIT 3
  )
  SELECT
    e.expedition_id AS id,
    e.name,
    e.description,
    e.highlights,
    CASE 
      WHEN MIN(i.duration) = MAX(i.duration) THEN 
        MIN(i.duration)::VARCHAR
      ELSE 
        (MIN(i.duration) || '-' || MAX(i.duration))::VARCHAR
    END AS duration,
    MIN(COALESCE(d.discounted_price, d.starting_price)) AS "startingPrice",
    -- 30000.00::DECIMAL(10,4) AS "startingPrice",
    e.website,
    e.photo_url AS "photoUrl",
    jsonb_build_object(
      'id', c.cruise_line_id,
      'name', c.name,
      'logo', c.logo
    ) AS "cruiseLine",
    json_agg(DISTINCT jsonb_build_object(
      'id', g.photo_id,
      'url', g.photo_url,
      'alt', g.alt
    )) FILTER (WHERE g.photo_id IS NOT NULL) AS gallery,
    COALESCE(jsonb_agg(DISTINCT v.vessel) FILTER (WHERE v.vessel IS NOT NULL), '[]'::jsonb) AS vessels,
    json_agg(DISTINCT jsonb_build_object(
      'id', i.itinerary_id,
      'name', i.name,
      'startPort', i.departing_from,
      'endPort', i.arriving_at,
      'duration', i.duration,
      'mapUrl', i.map_url,
      'schedules', i.schedule
    )) FILTER (WHERE i.itinerary_id IS NOT NULL) AS itineraries,
    COALESCE(jsonb_agg(DISTINCT d.departures) FILTER (WHERE d.departures IS NOT NULL), '[]'::jsonb) AS departures,
    COALESCE(jsonb_agg(DISTINCT ext.extension) FILTER (WHERE ext.extension IS NOT NULL), '[]'::jsonb) AS extensions,
    COALESCE(jsonb_agg(DISTINCT o.expedition) FILTER (WHERE o.expedition IS NOT NULL), '[]'::jsonb) AS "otherExpeditions"
  FROM antarctic.expeditions e
  JOIN antarctic.cruise_lines c ON c.cruise_line_id = e.cruise_line_id
  LEFT JOIN antarctic.gallery g ON g.expedition_id = e.expedition_id
  LEFT JOIN expeditions o ON o.cruise_line_id = e.cruise_line_id
  LEFT JOIN extensions ext ON ext.expedition_id = e.expedition_id
  LEFT JOIN itineraries i ON i.expedition_id = e.expedition_id
  LEFT JOIN departures d ON d.itinerary_id = i.itinerary_id
  LEFT JOIN vessels v ON v.vessel_id = d.vessel_id
  WHERE c.name = p_cruise_line AND e.name = p_name
  GROUP BY e.expedition_id, c.cruise_line_id;
END;
$$;

ALTER FUNCTION "antarctic"."get_expedition"("p_cruise_line" "text", "p_name" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "antarctic"."get_expedition_departures"("p_cruise_line" character varying, "p_name" character varying, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) RETURNS TABLE("totalItems" integer, "departures" "jsonb")
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
  total_items INTEGER;
  base_query TEXT;
  count_query TEXT;
  records_query TEXT;
  departures JSONB;
BEGIN
  IF p_page < 1 THEN
    RAISE EXCEPTION 'Page number must be greater than 0.';
  END IF;

  IF p_size < 1 THEN
    RAISE EXCEPTION 'Page size must be greater than 0.';
  END IF;

  base_query := '
    FROM antarctic.departures d
    JOIN antarctic.expeditions e ON e.expedition_id = d.expedition_id
    JOIN antarctic.cruise_lines c ON c.cruise_line_id = e.cruise_line_id
    JOIN antarctic.vessels v ON v.vessel_id = d.vessel_id
    JOIN antarctic.itineraries i ON i.itinerary_id = d.itinerary_id
    WHERE c.name = $1 AND e.name = $2 AND d.starting_price IS DISTINCT FROM NULL
  ';

  count_query := 'SELECT COUNT(*) FROM ( SELECT d.departure_id' || base_query || ') AS departures';

  EXECUTE count_query
  USING p_cruise_line, p_name
  INTO total_items;

  records_query := '
    WITH departure_info AS (
      SELECT
        d.departure_id,
        d.name,
        COALESCE(i.name, ''Itinerary '' || i.itinerary_id) AS itinerary,
        v.name AS vessel,
        i.departing_from,
        i.arriving_at,
        i.duration,
        d.start_date,
        d.end_date,
        d.starting_price,
        d.discounted_price,
        COALESCE(d.discounted_price, d.starting_price) AS price,
        d.website
      ' || base_query || '
      ORDER BY ' ||
      CASE p_sort
        WHEN 'price' THEN 'price'
        ELSE 'd.start_date'
      END || ' ' || 
      CASE 
        WHEN UPPER(p_order) = 'DESC' THEN 'DESC'
        ELSE 'ASC'
      END || ' NULLS LAST OFFSET $3 LIMIT $4
    )
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          ''id'', departure_id,
          ''name'', name,
          ''itinerary'', itinerary,
          ''vessel'', name,
          ''departingFrom'', departing_from,
          ''arrivingAt'', arriving_at,
          ''duration'', duration,
          ''startDate'', start_date,
          ''endDate'', end_date,
          ''startingPrice'', starting_price,
          ''discountedPrice'', discounted_price,
          ''website'', website
        )
        ORDER BY ' || 
        CASE p_sort
          WHEN 'price' THEN 'price'
          ELSE 'start_date'
        END || ' ' || 
        CASE 
          WHEN UPPER(p_order) = 'DESC' THEN 'DESC'
          ELSE 'ASC'
        END || ' NULLS LAST
      ) FILTER (WHERE departure_id IS NOT NULL), 
      ''[]''::jsonb) AS departures
    FROM departure_info';

  EXECUTE records_query
  USING p_cruise_line, p_name, p_size * (p_page - 1), p_size
  INTO departures;

  RETURN QUERY SELECT total_items AS "totalItems", departures;

END;
$_$;

ALTER FUNCTION "antarctic"."get_expedition_departures"("p_cruise_line" character varying, "p_name" character varying, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "antarctic"."get_expeditions"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) RETURNS TABLE("totalItems" integer, "expeditions" "jsonb")
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
  total_items INTEGER;
  base_query TEXT;
  count_query TEXT;
  records_query TEXT;
  expeditions JSONB;
BEGIN
  IF p_page < 1 THEN
    RAISE EXCEPTION 'Page number must be greater than 0.';
  END IF;

  IF p_size < 1 THEN
    RAISE EXCEPTION 'Page size must be greater than 0.';
  END IF;

  IF p_min_capacity < 0 THEN
    RAISE EXCEPTION 'Minimum capacity must be greater than or equal to 0.';
  END IF;

  IF p_min_duration < 0 THEN
    RAISE EXCEPTION 'Minimum duration must be greater than or equal to 0.';
  END IF;

  base_query := '
    FROM antarctic.expeditions e
    JOIN antarctic.cruise_lines c ON c.cruise_line_id = e.cruise_line_id
    LEFT JOIN antarctic.departures d ON e.expedition_id = d.expedition_id
    LEFT JOIN antarctic.vessels v ON v.vessel_id = d.vessel_id
    LEFT JOIN antarctic.itineraries i ON i.expedition_id = e.expedition_id
    WHERE
      ($1::DATE IS NULL OR d.start_date >= $1) AND
      ($2::DATE IS NULL OR d.end_date <= $2) AND
      (cardinality($3::TEXT[]) = 0 OR c.name = ANY($3)) AND
      ($4::INTEGER IS NULL OR v.capacity >= $4) AND
      ($5::INTEGER IS NULL OR v.capacity <= $5) AND
      ($6::INTEGER IS NULL OR i.duration >= $6) AND
      ($7::INTEGER IS NULL OR i.duration <= $7)
    GROUP BY e.expedition_id, c.cruise_line_id
  ';

  count_query := 'SELECT COUNT(*) FROM ( SELECT e.expedition_id' || base_query || ') AS expeditions';

  EXECUTE count_query
  USING p_start_date, p_end_date, p_cruise_lines, p_min_capacity, p_max_capacity, p_min_duration, p_max_duration
  INTO total_items;

  records_query := '
    WITH expedition_info AS (
      SELECT
        e.expedition_id,
        e.name,
        jsonb_build_object(
          ''id'', c.cruise_line_id,
          ''name'', c.name,
          ''logo'', c.logo
        ) AS cruise_line,
        MIN(v.capacity) AS capacity,
        CASE 
          WHEN MIN(i.duration) = MAX(i.duration) THEN 
            MIN(i.duration)::VARCHAR
          ELSE 
            (MIN(i.duration) || ''-'' || MAX(i.duration))
        END AS duration,
        MIN(d.start_date) AS start_date,
        MIN(COALESCE(d.discounted_price, d.starting_price)) AS price,
        e.photo_url
        ' || base_query || '
      ORDER BY ' ||
      CASE p_sort
        WHEN 'name' THEN 'name'
        WHEN 'price' THEN 'price'
        ELSE 'start_date'
      END || ' ' || 
      CASE 
        WHEN UPPER(p_order) = 'DESC' THEN 'DESC'
        ELSE 'ASC'
      END || ' NULLS LAST OFFSET $8 LIMIT $9
    )
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          ''id'', expedition_id,
          ''name'', name,
          ''cruiseLine'', cruise_line,
          ''capacity'', capacity,
          ''duration'', duration,
          ''startDate'', start_date,
          ''startingPrice'', price,
          ''photoUrl'', photo_url
        )
        ORDER BY ' || 
        CASE p_sort
          WHEN 'name' THEN 'name'
          WHEN 'price' THEN 'price'
          ELSE 'start_date'
        END || ' ' || 
        CASE 
          WHEN UPPER(p_order) = 'DESC' THEN 'DESC'
          ELSE 'ASC'
        END || ' NULLS LAST
      ),
    ''[]''::jsonb) AS expeditions
    FROM expedition_info';

  EXECUTE records_query
  USING p_start_date, p_end_date, p_cruise_lines, p_min_capacity, p_max_capacity, p_min_duration, p_max_duration, p_size * (p_page - 1), p_size
  INTO expeditions;

  RETURN QUERY SELECT total_items AS "totalItems", expeditions;

END;
$_$;

ALTER FUNCTION "antarctic"."get_expeditions"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "antarctic"."get_expeditions_test"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) RETURNS TABLE("id" integer, "name" character varying, "cruiseLine" "jsonb", "capacity" integer, "duration" "text", "startDate" "date", "startingPrice" numeric, "photoUrl" "text")
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
  records_query TEXT;
  expeditions JSONB;
BEGIN
  IF p_page < 1 THEN
    RAISE EXCEPTION 'Page number must be greater than 0.';
  END IF;

  IF p_size < 1 THEN
    RAISE EXCEPTION 'Page size must be greater than 0.';
  END IF;

  IF p_min_capacity < 0 THEN
    RAISE EXCEPTION 'Minimum capacity must be greater than or equal to 0.';
  END IF;

  IF p_min_duration < 0 THEN
    RAISE EXCEPTION 'Minimum duration must be greater than or equal to 0.';
  END IF;

  records_query := '
      SELECT
        e.expedition_id AS id,
        e.name,
        jsonb_build_object(
          ''id'', c.cruise_line_id,
          ''name'', c.name,
          ''logo'', c.logo
        ) AS "cruiseLine",
        MIN(v.capacity) AS capacity,
        CASE 
          WHEN MIN(i.duration) = MAX(i.duration) THEN 
            MIN(i.duration)::TEXT
          ELSE 
            (MIN(i.duration) || ''-'' || MAX(i.duration))
        END AS duration,
        MIN(d.start_date) AS "startDate",
        MIN(COALESCE(d.discounted_price, d.starting_price)) AS "startingPrice",
        e.photo_url AS "photoUrl"
      FROM antarctic.expeditions e
      JOIN antarctic.cruise_lines c ON c.cruise_line_id = e.cruise_line_id
      LEFT JOIN antarctic.departures d ON e.expedition_id = d.expedition_id
      LEFT JOIN antarctic.vessels v ON v.vessel_id = d.vessel_id
      LEFT JOIN antarctic.itineraries i ON i.expedition_id = e.expedition_id
      WHERE
        ($1::DATE IS NULL OR d.start_date >= $1) AND
        ($2::DATE IS NULL OR d.end_date <= $2) AND
        (cardinality($3::TEXT[]) = 0 OR c.name = ANY($3)) AND
        ($4::INTEGER IS NULL OR v.capacity >= $4) AND
        ($5::INTEGER IS NULL OR v.capacity <= $5) AND
        ($6::INTEGER IS NULL OR i.duration >= $6) AND
        ($7::INTEGER IS NULL OR i.duration <= $7)
      GROUP BY e.expedition_id, c.cruise_line_id
      ORDER BY ' ||
      CASE p_sort
        WHEN 'name' THEN 'name'
        WHEN 'price' THEN '"startingPrice"'
        ELSE '"startDate"'
      END || ' ' || 
      CASE 
        WHEN UPPER(p_order) = 'DESC' THEN 'DESC'
        ELSE 'ASC'
      END || ' NULLS LAST OFFSET $8 LIMIT $9';

  RETURN QUERY EXECUTE records_query
  USING p_start_date, p_end_date, p_cruise_lines, p_min_capacity, p_max_capacity, p_min_duration, p_max_duration, p_size * (p_page - 1), p_size;
END;
$_$;

ALTER FUNCTION "antarctic"."get_expeditions_test"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "antarctic"."cruise_lines" (
    "cruise_line_id" integer NOT NULL,
    "name" character varying(50) NOT NULL,
    "website" character varying(255) NOT NULL,
    "fleet_website" character varying(255),
    "expedition_website" "text" NOT NULL,
    "logo" "text" NOT NULL
);

ALTER TABLE "antarctic"."cruise_lines" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."cruise_lines_cruise_line_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."cruise_lines_cruise_line_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."cruise_lines_cruise_line_id_seq" OWNED BY "antarctic"."cruise_lines"."cruise_line_id";

CREATE TABLE IF NOT EXISTS "antarctic"."departures" (
    "departure_id" integer NOT NULL,
    "expedition_id" integer NOT NULL,
    "vessel_id" integer NOT NULL,
    "itinerary_id" integer NOT NULL,
    "name" character varying,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "starting_price" numeric(10,4),
    "discounted_price" numeric(10,4),
    "website" "text"
);

ALTER TABLE "antarctic"."departures" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."departures_departure_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."departures_departure_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."departures_departure_id_seq" OWNED BY "antarctic"."departures"."departure_id";

CREATE TABLE IF NOT EXISTS "antarctic"."expeditions" (
    "expedition_id" integer NOT NULL,
    "cruise_line_id" integer NOT NULL,
    "website" "text",
    "name" character varying(255) NOT NULL,
    "description" "text"[],
    "highlights" "text"[],
    "photo_url" "text"
);

ALTER TABLE "antarctic"."expeditions" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."expeditions_expedition_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."expeditions_expedition_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."expeditions_expedition_id_seq" OWNED BY "antarctic"."expeditions"."expedition_id";

CREATE TABLE IF NOT EXISTS "antarctic"."expeditions_extensions" (
    "expedition_id" integer NOT NULL,
    "extension_id" integer NOT NULL
);

ALTER TABLE "antarctic"."expeditions_extensions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "antarctic"."extensions" (
    "extension_id" integer NOT NULL,
    "cruise_line_id" integer NOT NULL,
    "name" character varying NOT NULL,
    "starting_price" numeric(10,4),
    "duration" integer,
    "photo_url" "text" NOT NULL,
    "website" "text"
);

ALTER TABLE "antarctic"."extensions" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."extensions_extension_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."extensions_extension_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."extensions_extension_id_seq" OWNED BY "antarctic"."extensions"."extension_id";

CREATE TABLE IF NOT EXISTS "antarctic"."gallery" (
    "photo_id" integer NOT NULL,
    "expedition_id" integer NOT NULL,
    "photo_url" "text" NOT NULL,
    "alt" "text"
);

ALTER TABLE "antarctic"."gallery" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."gallery_photo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."gallery_photo_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."gallery_photo_id_seq" OWNED BY "antarctic"."gallery"."photo_id";

CREATE TABLE IF NOT EXISTS "antarctic"."itineraries" (
    "itinerary_id" integer NOT NULL,
    "expedition_id" integer NOT NULL,
    "name" character varying(255),
    "departing_from" character varying(100),
    "arriving_at" character varying(100),
    "duration" integer NOT NULL,
    "map_url" "text"
);

ALTER TABLE "antarctic"."itineraries" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."itineraries_itinerary_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."itineraries_itinerary_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."itineraries_itinerary_id_seq" OWNED BY "antarctic"."itineraries"."itinerary_id";

CREATE TABLE IF NOT EXISTS "antarctic"."itinerary_details" (
    "detail_id" integer NOT NULL,
    "itinerary_id" integer NOT NULL,
    "day" character varying(10) NOT NULL,
    "header" character varying(255) NOT NULL,
    "content" "text"[] NOT NULL
);

ALTER TABLE "antarctic"."itinerary_details" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."itinerary_details_detail_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."itinerary_details_detail_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."itinerary_details_detail_id_seq" OWNED BY "antarctic"."itinerary_details"."detail_id";

CREATE TABLE IF NOT EXISTS "antarctic"."vessels" (
    "vessel_id" integer NOT NULL,
    "cruise_line_id" integer NOT NULL,
    "name" character varying NOT NULL,
    "capacity" integer NOT NULL,
    "cabins" integer,
    "description" "text"[],
    "website" "text",
    "photo_url" "text" NOT NULL
);

ALTER TABLE "antarctic"."vessels" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "antarctic"."vessels_vessel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "antarctic"."vessels_vessel_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "antarctic"."vessels_vessel_id_seq" OWNED BY "antarctic"."vessels"."vessel_id";

ALTER TABLE ONLY "antarctic"."cruise_lines" ALTER COLUMN "cruise_line_id" SET DEFAULT "nextval"('"antarctic"."cruise_lines_cruise_line_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."departures" ALTER COLUMN "departure_id" SET DEFAULT "nextval"('"antarctic"."departures_departure_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."expeditions" ALTER COLUMN "expedition_id" SET DEFAULT "nextval"('"antarctic"."expeditions_expedition_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."extensions" ALTER COLUMN "extension_id" SET DEFAULT "nextval"('"antarctic"."extensions_extension_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."gallery" ALTER COLUMN "photo_id" SET DEFAULT "nextval"('"antarctic"."gallery_photo_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."itineraries" ALTER COLUMN "itinerary_id" SET DEFAULT "nextval"('"antarctic"."itineraries_itinerary_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."itinerary_details" ALTER COLUMN "detail_id" SET DEFAULT "nextval"('"antarctic"."itinerary_details_detail_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."vessels" ALTER COLUMN "vessel_id" SET DEFAULT "nextval"('"antarctic"."vessels_vessel_id_seq"'::"regclass");

ALTER TABLE ONLY "antarctic"."cruise_lines"
    ADD CONSTRAINT "cruise_lines_expedition_website_key" UNIQUE ("expedition_website");

ALTER TABLE ONLY "antarctic"."cruise_lines"
    ADD CONSTRAINT "cruise_lines_fleet_website_key" UNIQUE ("fleet_website");

ALTER TABLE ONLY "antarctic"."cruise_lines"
    ADD CONSTRAINT "cruise_lines_logo_key" UNIQUE ("logo");

ALTER TABLE ONLY "antarctic"."cruise_lines"
    ADD CONSTRAINT "cruise_lines_name_key" UNIQUE ("name");

ALTER TABLE ONLY "antarctic"."cruise_lines"
    ADD CONSTRAINT "cruise_lines_pkey" PRIMARY KEY ("cruise_line_id");

ALTER TABLE ONLY "antarctic"."cruise_lines"
    ADD CONSTRAINT "cruise_lines_website_key" UNIQUE ("website");

ALTER TABLE ONLY "antarctic"."departures"
    ADD CONSTRAINT "departures_pkey" PRIMARY KEY ("departure_id");

ALTER TABLE ONLY "antarctic"."expeditions"
    ADD CONSTRAINT "expeditions_pkey" PRIMARY KEY ("expedition_id");

ALTER TABLE ONLY "antarctic"."extensions"
    ADD CONSTRAINT "extensions_pkey" PRIMARY KEY ("extension_id");

ALTER TABLE ONLY "antarctic"."gallery"
    ADD CONSTRAINT "gallery_pkey" PRIMARY KEY ("photo_id");

ALTER TABLE ONLY "antarctic"."itineraries"
    ADD CONSTRAINT "itineraries_pkey" PRIMARY KEY ("itinerary_id");

ALTER TABLE ONLY "antarctic"."itinerary_details"
    ADD CONSTRAINT "itinerary_details_pkey" PRIMARY KEY ("detail_id");

ALTER TABLE ONLY "antarctic"."expeditions"
    ADD CONSTRAINT "uc_cruise_line_name" UNIQUE ("cruise_line_id", "name");

ALTER TABLE ONLY "antarctic"."vessels"
    ADD CONSTRAINT "vessels_pkey" PRIMARY KEY ("vessel_id");

ALTER TABLE ONLY "antarctic"."expeditions"
    ADD CONSTRAINT "fk_cruise_line_id" FOREIGN KEY ("cruise_line_id") REFERENCES "antarctic"."cruise_lines"("cruise_line_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."vessels"
    ADD CONSTRAINT "fk_cruise_line_id" FOREIGN KEY ("cruise_line_id") REFERENCES "antarctic"."cruise_lines"("cruise_line_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."extensions"
    ADD CONSTRAINT "fk_cruise_line_id" FOREIGN KEY ("cruise_line_id") REFERENCES "antarctic"."cruise_lines"("cruise_line_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."gallery"
    ADD CONSTRAINT "fk_expedition_id" FOREIGN KEY ("expedition_id") REFERENCES "antarctic"."expeditions"("expedition_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."itineraries"
    ADD CONSTRAINT "fk_expedition_id" FOREIGN KEY ("expedition_id") REFERENCES "antarctic"."expeditions"("expedition_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."departures"
    ADD CONSTRAINT "fk_expedition_id" FOREIGN KEY ("expedition_id") REFERENCES "antarctic"."expeditions"("expedition_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."expeditions_extensions"
    ADD CONSTRAINT "fk_expedition_id" FOREIGN KEY ("expedition_id") REFERENCES "antarctic"."expeditions"("expedition_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."expeditions_extensions"
    ADD CONSTRAINT "fk_extension_id" FOREIGN KEY ("extension_id") REFERENCES "antarctic"."extensions"("extension_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."itinerary_details"
    ADD CONSTRAINT "fk_itinerary_id" FOREIGN KEY ("itinerary_id") REFERENCES "antarctic"."itineraries"("itinerary_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."departures"
    ADD CONSTRAINT "fk_itinerary_id" FOREIGN KEY ("itinerary_id") REFERENCES "antarctic"."itineraries"("itinerary_id") ON DELETE CASCADE;

ALTER TABLE ONLY "antarctic"."departures"
    ADD CONSTRAINT "fk_vessel_id" FOREIGN KEY ("vessel_id") REFERENCES "antarctic"."vessels"("vessel_id") ON DELETE CASCADE;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "antarctic" TO "anon";
GRANT USAGE ON SCHEMA "antarctic" TO "authenticated";
GRANT USAGE ON SCHEMA "antarctic" TO "service_role";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "antarctic"."get_expedition"("p_cruise_line" "text", "p_name" "text") TO "anon";
GRANT ALL ON FUNCTION "antarctic"."get_expedition"("p_cruise_line" "text", "p_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "antarctic"."get_expedition"("p_cruise_line" "text", "p_name" "text") TO "service_role";

GRANT ALL ON FUNCTION "antarctic"."get_expedition_departures"("p_cruise_line" character varying, "p_name" character varying, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "anon";
GRANT ALL ON FUNCTION "antarctic"."get_expedition_departures"("p_cruise_line" character varying, "p_name" character varying, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "antarctic"."get_expedition_departures"("p_cruise_line" character varying, "p_name" character varying, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "service_role";

GRANT ALL ON FUNCTION "antarctic"."get_expeditions"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "anon";
GRANT ALL ON FUNCTION "antarctic"."get_expeditions"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "antarctic"."get_expeditions"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "service_role";

GRANT ALL ON FUNCTION "antarctic"."get_expeditions_test"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "anon";
GRANT ALL ON FUNCTION "antarctic"."get_expeditions_test"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "antarctic"."get_expeditions_test"("p_start_date" "date", "p_end_date" "date", "p_cruise_lines" "text"[], "p_min_capacity" integer, "p_max_capacity" integer, "p_min_duration" integer, "p_max_duration" integer, "p_page" integer, "p_size" integer, "p_sort" character varying, "p_order" character varying) TO "service_role";

GRANT ALL ON TABLE "antarctic"."cruise_lines" TO "anon";
GRANT ALL ON TABLE "antarctic"."cruise_lines" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."cruise_lines" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."cruise_lines_cruise_line_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."cruise_lines_cruise_line_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."cruise_lines_cruise_line_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."departures" TO "anon";
GRANT ALL ON TABLE "antarctic"."departures" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."departures" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."departures_departure_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."departures_departure_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."departures_departure_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."expeditions" TO "anon";
GRANT ALL ON TABLE "antarctic"."expeditions" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."expeditions" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."expeditions_expedition_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."expeditions_expedition_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."expeditions_expedition_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."expeditions_extensions" TO "anon";
GRANT ALL ON TABLE "antarctic"."expeditions_extensions" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."expeditions_extensions" TO "service_role";

GRANT ALL ON TABLE "antarctic"."extensions" TO "anon";
GRANT ALL ON TABLE "antarctic"."extensions" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."extensions" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."extensions_extension_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."extensions_extension_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."extensions_extension_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."gallery" TO "anon";
GRANT ALL ON TABLE "antarctic"."gallery" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."gallery" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."gallery_photo_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."gallery_photo_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."gallery_photo_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."itineraries" TO "anon";
GRANT ALL ON TABLE "antarctic"."itineraries" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."itineraries" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."itineraries_itinerary_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."itineraries_itinerary_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."itineraries_itinerary_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."itinerary_details" TO "anon";
GRANT ALL ON TABLE "antarctic"."itinerary_details" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."itinerary_details" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."itinerary_details_detail_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."itinerary_details_detail_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."itinerary_details_detail_id_seq" TO "service_role";

GRANT ALL ON TABLE "antarctic"."vessels" TO "anon";
GRANT ALL ON TABLE "antarctic"."vessels" TO "authenticated";
GRANT ALL ON TABLE "antarctic"."vessels" TO "service_role";

GRANT ALL ON SEQUENCE "antarctic"."vessels_vessel_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "antarctic"."vessels_vessel_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "antarctic"."vessels_vessel_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "antarctic" GRANT ALL ON TABLES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
