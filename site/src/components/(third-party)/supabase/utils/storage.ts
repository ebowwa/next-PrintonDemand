// utils/supabase/storage.ts
// access to the public bucket

import { createClient } from './client';

export const getPublicUrl = async (
  bucketId: string,
  path: string,
  options?: {
    download?: string | boolean;
  }
): Promise<string> => {
  const supabase = createClient();

  try {
    const { data } = await supabase.storage
      .from(bucketId)
      .getPublicUrl(path, options);

    return data.publicUrl;
  } catch (error) {
    // Here, 'error' is an actual Error object thrown by the promise
    // You can handle it accordingly, for example, log it or throw it again
    console.error('Failed to get public URL:', error);
    throw error; // Rethrow or handle as needed
  }
};
