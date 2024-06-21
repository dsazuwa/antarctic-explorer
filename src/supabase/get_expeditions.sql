CREATE OR REPLACE FUNCTION antarctic.get_expeditions (
  p_start_date DATE,
  p_end_date DATE,
  p_cruise_lines TEXT[],
  p_min_capacity INTEGER,
  p_max_capacity INTEGER,
  p_min_duration INTEGER,
  p_max_duration INTEGER,
  p_page INTEGER,
  p_size INTEGER,
  p_sort VARCHAR,
  p_order VARCHAR
) RETURNS TABLE (
  "totalItems" INTEGER,
  expeditions JSONB
) AS $$
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
$$ LANGUAGE plpgsql;
