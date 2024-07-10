"use client";
// hooks/useAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';

export const useAuth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Adjusted to handle the new return object structure
    const { success, redirectUrl } = await handleRequest(e, signInWithPassword, router);
    
    setIsSubmitting(false);

    if (success) {
      // Utilize the redirectUrl if necessary, or default to dashboard
      router.replace(redirectUrl || '/dashboard');
    }
  };

  return { isSubmitting, signIn };
};
