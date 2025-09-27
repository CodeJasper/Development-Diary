import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const globalForSupabase = globalThis as unknown as {
	supabase: SupabaseClient | undefined;
};

export const subapaseClient =
	globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== "production")
	globalForSupabase.supabase = subapaseClient;
