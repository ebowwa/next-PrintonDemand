'use client';
// src/utils/auth-helpers/client.ts
import { createClient } from '@/components/(third-party)/supabase/utils/client';
import { type Provider } from '@supabase/supabase-js';
import { getURL } from '@/utils/helpers';
import { redirectToPath } from './server';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Adjusted return type to include success property
export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<{ success: boolean; redirectUrl?: string }> {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    await router.push(redirectUrl);
    // Indicate success and include redirect URL
    return { success: true, redirectUrl };
  } else {
    await redirectToPath(redirectUrl);
    // Assume success if redirection is server-side
    return { success: true, redirectUrl };
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get('provider')).trim() as Provider;

  const supabase = createClient();
  const redirectURL = getURL('/auth/callback');
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL
    }
  });
}
