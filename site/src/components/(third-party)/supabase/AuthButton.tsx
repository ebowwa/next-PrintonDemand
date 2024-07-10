// src/components/AuthButtons.tsx
"use client";
// signed in and in the landing page
import React from 'react';
import { useUser } from '@/utils/storage/context/UserContext';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

const AuthButtons: React.FC = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const redirectMethod = getRedirectMethod();

  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, redirectUrl } = await handleRequest(e, SignOut, redirectMethod === 'client' ? router : null);
    if (success && redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {!loading && user ? (
        <>
          {/* User is logged in */}
          <span>Welcome, {user.email}</span>
          <form onSubmit={handleSignOut}>
            <Button type="submit" className="ml-4" variant="secondary">
              Sign Out
            </Button>
          </form>
        </>
      ) : (
        <>
          {/* User is not logged in */}
          <Button className="ml-4" variant="secondary" onClick={() => router.push('/signin')}>
            Sign in
          </Button>
          <Button className="ml-2" onClick={() => router.push('/labs')}>Try for free</Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;