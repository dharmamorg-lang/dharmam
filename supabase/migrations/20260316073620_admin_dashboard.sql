-- Admin Dashboard Migration
-- Tables: gallery_photos, contact_messages, volunteer_applications
-- Storage: gallery-images bucket

-- ============================================================
-- 1. TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.volunteer_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    pronoun TEXT,
    dob TEXT,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT,
    city TEXT NOT NULL,
    country TEXT DEFAULT 'India',
    languages TEXT,
    education TEXT,
    how_heard TEXT,
    why_volunteer TEXT,
    goals TEXT,
    preferred_roles TEXT[],
    skills TEXT[],
    availability TEXT[],
    shift TEXT[],
    special_events_only BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_gallery_photos_category ON public.gallery_photos(category);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_created_at ON public.gallery_photos(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON public.contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created_at ON public.volunteer_applications(created_at);

-- ============================================================
-- 3. ENABLE RLS
-- ============================================================

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS POLICIES
-- ============================================================

-- gallery_photos: public read, authenticated write
DROP POLICY IF EXISTS "public_read_gallery_photos" ON public.gallery_photos;
CREATE POLICY "public_read_gallery_photos"
ON public.gallery_photos FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "authenticated_manage_gallery_photos" ON public.gallery_photos;
CREATE POLICY "authenticated_manage_gallery_photos"
ON public.gallery_photos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- contact_messages: public insert (anyone can submit), authenticated read/update
DROP POLICY IF EXISTS "public_insert_contact_messages" ON public.contact_messages;
CREATE POLICY "public_insert_contact_messages"
ON public.contact_messages FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_read_contact_messages" ON public.contact_messages;
CREATE POLICY "authenticated_read_contact_messages"
ON public.contact_messages FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_update_contact_messages" ON public.contact_messages;
CREATE POLICY "authenticated_update_contact_messages"
ON public.contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_contact_messages" ON public.contact_messages;
CREATE POLICY "authenticated_delete_contact_messages"
ON public.contact_messages FOR DELETE TO authenticated USING (true);

-- volunteer_applications: public insert, authenticated read
DROP POLICY IF EXISTS "public_insert_volunteer_applications" ON public.volunteer_applications;
CREATE POLICY "public_insert_volunteer_applications"
ON public.volunteer_applications FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_read_volunteer_applications" ON public.volunteer_applications;
CREATE POLICY "authenticated_read_volunteer_applications"
ON public.volunteer_applications FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_delete_volunteer_applications" ON public.volunteer_applications;
CREATE POLICY "authenticated_delete_volunteer_applications"
ON public.volunteer_applications FOR DELETE TO authenticated USING (true);

-- ============================================================
-- 5. ADMIN USER SETUP
-- ============================================================

DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
BEGIN
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES (
        admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'info@dharmam.org', crypt('Dharmam!@2026', gen_salt('bf', 10)), now(), now(), now(),
        jsonb_build_object('full_name', 'Dharmam Admin', 'role', 'admin'),
        jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
        false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    )
    ON CONFLICT (email) DO NOTHING;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Admin user creation skipped: %', SQLERRM;
END $$;
