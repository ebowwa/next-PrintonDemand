import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set Secure attribute and SameSite=Lax for cookies
          const modifiedOptions = {
            ...options,
            sameSite: 'Lax',
            secure: true,
            path: '/', // Cookies should be accessible for all paths
          };
          request.cookies.set({ name, value, ...modifiedOptions });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({ name, value, ...modifiedOptions });
        },
        remove(name: string, options: CookieOptions) {
          // Ensure Secure and SameSite attributes are set correctly when removing cookies
          const modifiedOptions = {
            ...options,
            sameSite: 'Lax',
            secure: true,
            path: '/',
          };
          request.cookies.set({ name, value: '', ...modifiedOptions });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({ name, value: '', ...modifiedOptions });
        }
      }
    }
  );

  return { supabase, response };
};

export const updateSession = async (request: NextRequest) => {
  try {
    const { supabase, response } = createClient(request);

    // This will refresh the session if expired - required for Server Components
    await supabase.auth.getUser();

    return response;
  } catch (e) {
    // Handle error
    console.error('Error refreshing session:', e);
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};

// Imports the necessary modules from Supabase and Next.js for server-side rendering and cookie management.
// `createServerClient` is used to initialize the Supabase client on the server-side.
// `CookieOptions` is a type definition for specifying options when setting cookies.
// `NextRequest` and `NextResponse` types are used for handling requests and responses in Next.js middleware.

// Defines `createClient` function to configure and return a Supabase client and a response object customized for cookie management.
// This function is essential for managing user sessions and authentication in a server-side context.
// The function takes a `NextRequest` object as its argument to access request details, such as headers and cookies.

  // Initializes an unmodified NextResponse object, preserving the original request headers for consistency across requests.

  // Configures the Supabase client with environment variables for the URL and anonymous access key.
  // Customizes cookie handling within the Supabase client to integrate seamlessly with Next.js's request-response model.
    // Implements a `get` method to retrieve a cookie's value from the incoming request.
    // Implements a `set` method to update or set a new cookie in both the request and the response, applying specified options.
    // Implements a `remove` method to delete a cookie by setting its value to an empty string and updating both request and response.

// Returns the configured Supabase client along with the response object, facilitating further operations requiring Supabase access or response modifications.

// Defines `updateSession` function to refresh the user's session, leveraging the Supabase client configured in `createClient`.
// This function is crucial for maintaining valid user sessions, especially in server components that rely on server-side rendering or static generation.
// It attempts to refresh the user session by invoking Supabase's authentication methods and returns the updated response object.
  // Utilizes a try-catch block to handle potential errors during session refresh, ensuring graceful degradation in case of configuration issues or other errors.
  // In case of failure, returns a default NextResponse object, maintaining the flow of the application without breaking the user experience.
