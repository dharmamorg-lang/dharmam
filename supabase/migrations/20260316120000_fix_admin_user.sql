-- Fix admin user: upsert with correct credentials
-- Admin email: info@dharmam.org | Password: Dharmam!@2026

DO $$
DECLARE
    admin_uuid UUID;
BEGIN
    -- Check if admin user already exists
    SELECT id INTO admin_uuid FROM auth.users WHERE email = 'info@dharmam.org' LIMIT 1;

    IF admin_uuid IS NULL THEN
        -- Create new admin user
        admin_uuid := gen_random_uuid();
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
        );
        RAISE NOTICE 'Admin user created: info@dharmam.org';
    ELSE
        -- Update password for existing admin user
        UPDATE auth.users
        SET encrypted_password = crypt('Dharmam!@2026', gen_salt('bf', 10)),
            email_confirmed_at = COALESCE(email_confirmed_at, now()),
            updated_at = now()
        WHERE id = admin_uuid;
        RAISE NOTICE 'Admin user password updated: info@dharmam.org';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Admin user setup failed: %', SQLERRM;
END $$;
