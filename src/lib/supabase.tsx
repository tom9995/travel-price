import { createClient } from "@supabase/supabase-js";

export function getClient() {
  const supabaseClient = createClient(
    import.meta.env.VITE_SP_URL,
    import.meta.env.VITE_SP_KEY
  );

  return supabaseClient;
}
