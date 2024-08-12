/* Because server components are already in the last chain of Next.js rendering
they cannot set or delete cookies */

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export function createSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
