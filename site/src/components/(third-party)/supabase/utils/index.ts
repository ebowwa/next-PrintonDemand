// utils/supabase/index.ts
import { createClient as createBrowserClient } from './client';
import { createClient as createServerClient } from './server';

export const useSupabase = () => {
  if (typeof window !== "undefined") {
    // Client-side
    return createBrowserClient();
  } else {
    // Server-side
    return createServerClient();
  }
};
