GRANT USAGE ON SCHEMA antarctic TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA antarctic TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA antarctic TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA antarctic TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA antarctic GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA antarctic GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA antarctic GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
