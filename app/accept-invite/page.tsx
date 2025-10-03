/**
 * Accept Invite Page
 *
 * This page handles the invite acceptance flow for new UTESCA executive members.
 * Users land here after clicking the invite link in their email.
 *
 * Flow:
 * 1. Extract token_hash and type from URL params
 * 2. Verify the invite token with Supabase
 * 3. Display form to set password and optional preferred name
 * 4. Update user password via Supabase
 * 5. Redirect to dashboard
 */

'use client'

import { Suspense } from 'react'
import AcceptInviteForm from '@/components/AcceptInviteForm'

export default function AcceptInvitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to UTESCA
            </h1>
            <p className="text-gray-600">
              Complete your account setup to get started
            </p>
          </div>

          <Suspense fallback={<LoadingState />}>
            <AcceptInviteForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Questions? Contact{' '}
          <a
            href="mailto:copresidents@utesca.ca"
            className="text-blue-600 hover:underline"
          >
            copresidents@utesca.ca
          </a>
        </p>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-300 rounded"></div>
    </div>
  )
}
