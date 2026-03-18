-- Fix: Allow anon role to read contact_messages and volunteer_applications
-- The admin dashboard uses a custom cookie session (not Supabase auth),
-- so the client runs as anon. We need anon SELECT policies.

-- contact_messages: allow anon to read (admin dashboard is not Supabase-authenticated)
DROP POLICY IF EXISTS "anon_read_contact_messages" ON public.contact_messages;
CREATE POLICY "anon_read_contact_messages"
ON public.contact_messages FOR SELECT TO anon USING (true);

-- contact_messages: allow anon to update (mark as read)
DROP POLICY IF EXISTS "anon_update_contact_messages" ON public.contact_messages;
CREATE POLICY "anon_update_contact_messages"
ON public.contact_messages FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- volunteer_applications: allow anon to read
DROP POLICY IF EXISTS "anon_read_volunteer_applications" ON public.volunteer_applications;
CREATE POLICY "anon_read_volunteer_applications"
ON public.volunteer_applications FOR SELECT TO anon USING (true);

-- volunteer_applications: allow anon to delete
DROP POLICY IF EXISTS "anon_delete_volunteer_applications" ON public.volunteer_applications;
CREATE POLICY "anon_delete_volunteer_applications"
ON public.volunteer_applications FOR DELETE TO anon USING (true);

-- gallery_photos: allow anon to manage (for admin gallery management)
DROP POLICY IF EXISTS "anon_manage_gallery_photos" ON public.gallery_photos;
CREATE POLICY "anon_manage_gallery_photos"
ON public.gallery_photos FOR ALL TO anon USING (true) WITH CHECK (true);
