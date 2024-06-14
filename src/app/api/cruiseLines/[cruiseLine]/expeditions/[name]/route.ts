import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  {
    params: { cruiseLine, name },
  }: { params: { cruiseLine: string; name: string } },
) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );

  const { data } = await supabase.schema('antarctic').rpc('get_expedition', {
    p_cruise_line: cruiseLine,
    p_name: name,
  });

  return NextResponse.json({ ...data[0] }, { status: 200 });
}
