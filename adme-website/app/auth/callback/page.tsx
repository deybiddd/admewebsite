"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * AuthCallback page handles Supabase email confirmation and automatic login.
 * Shows a loading state while processing, then redirects to dashboard.
 */
export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Supabase will automatically parse the URL and set the session if present
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setLoading(false);
        router.replace("/dashboard");
      }
    });

    // Fallback: If not signed in after a short delay, show error
    const timeout = setTimeout(() => {
      setLoading(false);
      setError("Authentication failed or link expired. Please try logging in again.");
    }, 8000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adme-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Logging you in...</h2>
            <p className="text-gray-500">Please wait while we confirm your email and log you in.</p>
          </>
        ) : error ? (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Authentication Error</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <a href="/" className="text-adme-600 hover:underline">Return to Home</a>
          </>
        ) : null}
      </div>
    </div>
  );
} 