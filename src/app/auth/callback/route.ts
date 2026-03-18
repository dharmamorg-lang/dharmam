import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

const ALLOWED_ADMIN_EMAIL = 'dharmam.org@gmail.com';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if the authenticated user's email is allowed
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email !== ALLOWED_ADMIN_EMAIL) {
        // Sign out the unauthorized user
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/admin/login?error=access_denied`
        );
      }

      // Authorized — redirect to dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
