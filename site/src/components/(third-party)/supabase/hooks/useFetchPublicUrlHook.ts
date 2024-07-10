// FetchPublicUrlHook.ts
// for public supabase storage bucket
"use client";
import { useState, useEffect } from 'react';
import { getPublicUrl } from '../utils/storage';

// Custom hook for fetching a public URL from Supabase storage
export const usePublicUrl = (bucketName: string, path: string) => {
  const [publicUrl, setPublicUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getPublicUrl(bucketName, path);
        setPublicUrl(url);
      } catch (error) {
        console.error('Failed to retrieve public URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [bucketName, path]);

  return { publicUrl, loading };
};
