CREATE OR REPLACE FUNCTION antarctic.get_expedition_departures (
  p_cruise_line VARCHAR,
  p_name VARCHAR,
  p_page INTEGER,
  p_size INTEGER,
  p_sort VARCHAR,
  p_order VARCHAR
) RETURNS TABLE (
  "totalItems" INTEGER,
  departures JSONB
) AS $$
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
$$ LANGUAGE plpgsql;