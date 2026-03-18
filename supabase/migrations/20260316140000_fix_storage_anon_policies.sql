-- Fix: Allow anon role to upload/delete files in the 'dharmam' storage bucket
-- The admin dashboard uses a custom cookie session (not Supabase auth),
-- so storage requests run as anon. Without these policies, Supabase Storage
-- rejects uploads with "Invalid Compact JWS" (permission denied).

-- Allow anon to SELECT (read/list) objects in dharmam bucket
DROP POLICY IF EXISTS "anon_select_dharmam_storage" ON storage.objects;
CREATE POLICY "anon_select_dharmam_storage"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'dharmam');

-- Allow anon to INSERT (upload) objects into dharmam bucket
DROP POLICY IF EXISTS "anon_insert_dharmam_storage" ON storage.objects;
CREATE POLICY "anon_insert_dharmam_storage"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'dharmam');

-- Allow anon to UPDATE objects in dharmam bucket
DROP POLICY IF EXISTS "anon_update_dharmam_storage" ON storage.objects;
CREATE POLICY "anon_update_dharmam_storage"
ON storage.objects FOR UPDATE TO anon
USING (bucket_id = 'dharmam')
WITH CHECK (bucket_id = 'dharmam');

-- Allow anon to DELETE objects from dharmam bucket
DROP POLICY IF EXISTS "anon_delete_dharmam_storage" ON storage.objects;
CREATE POLICY "anon_delete_dharmam_storage"
ON storage.objects FOR DELETE TO anon
USING (bucket_id = 'dharmam');

-- Ensure the dharmam bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('dharmam', 'dharmam', true)
ON CONFLICT (id) DO UPDATE SET public = true;
