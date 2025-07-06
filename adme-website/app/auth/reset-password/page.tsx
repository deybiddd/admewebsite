"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Password Reset Handler for Supabase
 * Reads the code from the URL, allows user to set a new password, and handles all states.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check for code in URL
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      setError("Invalid or missing reset code. Please use the link from your email.");
    }
  }, [code]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Supabase will use the code in the URL automatically
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.replace("/dashboard"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border-2 border-yellow-600 relative">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/images/adme-logo.png" alt="Adme Logo" width={60} height={60} className="mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
            Set New Password
          </h2>
          <p className="text-yellow-700 text-sm font-light text-center mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Enter your new password below.
          </p>
        </div>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {success ? (
          <div className="text-green-700 text-center font-bold py-4">Password updated! Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
              style={{ fontFamily: 'var(--font-londrina), sans-serif' }}
            >
              {loading ? 'Updating...' : 'Set Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 