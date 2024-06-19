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
    WHERE
      ($1::DATE IS NULL OR d.start_date >= $1) AND
      ($2::DATE IS NULL OR d.end_date <= $2) AND
      (cardinality($3::TEXT[]) = 0 OR c.name = ANY($3)) AND
      ($4::INTEGER IS NULL OR v.capacity >= $4) AND
      ($5::INTEGER IS NULL OR v.capacity <= $5) AND
      (
        CASE
          WHEN POSITION(''-'' IN e.duration) > 0 THEN
            CAST(SPLIT_PART(e.duration, ''-'', 1) AS INTEGER) BETWEEN $6 AND $7
            OR CAST(SPLIT_PART(e.duration, ''-'', 2) AS INTEGER) BETWEEN $6 AND $7
          ELSE CAST(e.duration AS INTEGER) BETWEEN $6 AND $7
        END
      )
    GROUP BY e.expedition_id, c.cruise_line_id
  ';

  count_query := 'SELECT COUNT(*) FROM ( SELECT e.expedition_id' || base_query || ') AS expeditions';

  EXECUTE count_query
  USING p_start_date, p_end_date, p_cruise_lines, p_min_capacity, p_max_capacity, p_min_duration, p_max_duration
  INTO total_items;

  records_query := '
    WITH expedition_info AS (
      SELECT
        jsonb_build_object(
          ''id'', e.expedition_id,
          ''name'', e.name,
          ''cruiseLine'', jsonb_build_object(
            ''id'', c.cruise_line_id,
            ''name'', c.name,
            ''logo'', c.logo
          ),
          ''capacity'', min(v.capacity),
          ''duration'', e.duration,
          ''startDate'', min(d.start_date),
          ''startingPrice'', e.starting_price,
          ''photoUrl'', e.photo_url
        ) AS expedition
      ' || base_query || '
      ORDER BY ' ||
      CASE p_sort
        WHEN 'name' THEN 'e.name'
        WHEN 'cruiseLine' THEN 'c.name, e.name'
        WHEN 'startDate' THEN 'min(d.start_date)'
        WHEN 'price' THEN 'e.starting_price'
        ELSE 'e.expedition_id'
      END || ' ' || 
      CASE 
        WHEN UPPER(p_order) = 'DESC' THEN 'DESC'
        ELSE 'ASC'
      END || ' NULLS LAST OFFSET $8 LIMIT $9
    )
    SELECT COALESCE(jsonb_agg(DISTINCT expedition) FILTER (WHERE expedition IS NOT NULL), ''[]''::jsonb) AS expeditions
    FROM expedition_info';

  EXECUTE records_query
  USING p_start_date, p_end_date, p_cruise_lines, p_min_capacity, p_max_capacity, p_min_duration, p_max_duration, p_size * (p_page - 1), p_size
  INTO expeditions;

  RETURN QUERY SELECT total_items AS "totalItems", expeditions;

END;
$$ LANGUAGE plpgsql;
