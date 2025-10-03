/**
 * Accept Invite Form Component
 *
 * Handles the form for new users to set their password and preferred name
 * after clicking the invite link.
 *
 * TECHNICAL NOTE: This component uses Supabase client for the invite flow.
 * This is necessary because Supabase invite tokens must be verified client-side.
 * We minimize Supabase usage to ONLY:
 * - Verifying the invite token (getSession)
 * - Setting the password (updateUser)
 * All other operations go through our backend API.
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

interface UserMetadata {
  first_name: string;
  last_name: string;
  role: string;
  display_role: string;
}

export default function AcceptInviteForm() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredName, setPreferredName] = useState('');

  // Verify invite token and fetch user metadata
  useEffect(() => {
    async function verifyInvite() {
      try {
        console.log('=== INVITE VERIFICATION START ===');
        console.log('Full URL:', window.location.href);

        // Check search params for token_hash (Supabase invite flow)
        const searchParams = new URLSearchParams(window.location.search);
        const tokenHash = searchParams.get('token_hash');
        const typeParam = searchParams.get('type');

        console.log('Search params:', {
          token_hash: tokenHash?.substring(0, 20) + '...',
          type: typeParam,
        });

        // If we have a token_hash, verify it with Supabase
        if (tokenHash && typeParam === 'invite') {
          console.log('Found token_hash, verifying OTP...');

          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'invite',
          });

          if (verifyError) {
            console.error('OTP verification error:', verifyError);
            setError('Invalid or expired invite link');
            return;
          }

          console.log('OTP verified successfully:', data.user?.email);
          console.log('User metadata:', data.user?.user_metadata);

          if (data.session && data.user) {
            // Extract user metadata from session
            const metadata = data.user.user_metadata as UserMetadata;
            if (!metadata.first_name || !metadata.last_name) {
              console.error('Missing metadata:', metadata);
              setError('Invalid user metadata - please contact co-presidents');
              return;
            }

            console.log('Metadata valid:', metadata);
            setUserMetadata(metadata);
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          }
        }

        console.log('No token_hash in URL, checking existing session...');

        // If no token in URL, check if we already have a session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log('Existing session check:', {
          hasSession: !!session,
          sessionError: sessionError,
          userEmail: session?.user.email,
        });

        if (sessionError || !session) {
          console.error('No valid session found');
          setError('Invalid or expired invite link');
          return;
        }

        console.log('User metadata from existing session:', session.user.user_metadata);

        // Extract user metadata from session
        const metadata = session.user.user_metadata as UserMetadata;
        if (!metadata.first_name || !metadata.last_name) {
          console.error('Missing metadata in existing session:', metadata);
          setError('Invalid user metadata - please contact co-presidents');
          return;
        }

        console.log('Metadata valid from existing session:', metadata);
        setUserMetadata(metadata);
      } catch (err) {
        console.error('Error verifying invite:', err);
        setError('Failed to verify invite');
      }
    }

    verifyInvite();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Update user password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        throw updateError;
      }

      // If preferred name is provided, update profile via backend API
      if (preferredName.trim()) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                preferred_name: preferredName.trim(),
              }),
            }
          );
        }
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error setting up account:', err);
      setError(err.message || 'Failed to set up account');
    } finally {
      setLoading(false);
    }
  };

  if (error && !userMetadata) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-800 font-medium">{error}</p>
        <p className="text-red-600 text-sm mt-2">
          Please contact the co-presidents for a new invite link.
        </p>
      </div>
    );
  }

  if (!userMetadata) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Display user info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800 mb-1">
          <strong>Name:</strong> {userMetadata.first_name}{' '}
          {userMetadata.last_name}
        </p>
        <p className="text-sm text-blue-800">
          <strong>Role:</strong> {userMetadata.display_role}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Preferred Name (Optional) */}
        <div>
          <label
            htmlFor="preferredName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Name (Optional)
          </label>
          <input
            id="preferredName"
            type="text"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
            placeholder="How you'd like to be called"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            If different from {userMetadata.first_name}
          </p>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="At least 8 characters"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Re-enter your password"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Setting up account...' : 'Complete Setup'}
        </button>
      </form>
    </div>
  );
}
