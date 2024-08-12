/* This client is made to be used on Server Actions and Route Handlers,
can read, set and delete cookies.
*/

import { Database } from "@/types/supabase";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// export function createSupabaseRouteAndActionsClient(
//   cookieStore: ReturnType<typeof cookies>,
// ) {
export function createSupabaseAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookies().set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookies().set({ name, value: "", ...options });
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
