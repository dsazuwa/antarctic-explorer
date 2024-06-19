CREATE OR REPLACE FUNCTION antarctic.get_expedition(p_cruise_line TEXT, p_name TEXT)
RETURNS TABLE (
  id INTEGER,
  name VARCHAR,
  description TEXT[],
  highlights TEXT[],
  duration VARCHAR,
  "startingPrice" DECIMAL(10,4),
  website TEXT,
  "photoUrl" TEXT,
  "cruiseLine" JSONB,
  gallery JSON,
  vessels JSONB,
  itineraries JSON,
  departures JSONB,
  extensions JSONB,
  "otherExpeditions" JSONB
) AS $$
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
        'duration', e.duration,
        'startDate', min(d.start_date),
        'startingPrice', e.starting_price,
        'photoUrl', e.photo_url
      ) AS expedition
    FROM antarctic.expeditions e
    JOIN antarctic.cruise_lines c ON c.cruise_line_id = e.cruise_line_id
    LEFT JOIN (SELECT * FROM antarctic.departures d) d ON e.expedition_id = d.expedition_id
    WHERE c.name = p_cruise_line AND e.name <> p_name
    GROUP BY e.expedition_id, c.cruise_line_id
    LIMIT 3
  )
  SELECT
    e.expedition_id AS id,
    e.name,
    e.description,
    e.highlights,
    e.duration,
    e.starting_price AS "startingPrice",
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
$$ LANGUAGE plpgsql;