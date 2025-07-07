'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SignUpModal from './SignUpModal'
import ProfileModal from './ProfileModal'
import PasswordResetModal from './PasswordResetModal'
import Link from 'next/link'
import LoadingButton from './LoadingButton'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const { user, profile, signIn, signOut, loading, profileFetchError } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError(null)

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setShowSignInForm(false)
      setEmail('')
      setPassword('')
      router.push('/dashboard')
    }
    
    setIsSigningIn(false)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleCloseSignIn = () => {
    setShowSignInForm(false)
    setEmail('')
    setPassword('')
    setError(null)
  }

  const handleSwitchToSignUp = () => {
    setShowSignInForm(false)
    setShowSignUpForm(true)
  }

  const handleSwitchToSignIn = () => {
    setShowSignUpForm(false)
    setShowSignInForm(true)
  }

  const handleShowPasswordReset = () => {
    setShowSignInForm(false)
    setShowPasswordReset(true)
  }

  const handleSignInClick = () => {
    setShowSignInForm(true)
  }

  const handleSignUpClick = () => {
    setShowSignUpForm(true)
  }

  if (loading) {
    return (
      <button
        className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
        disabled
        aria-busy="true"
      >
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span>Loading…</span>
      </button>
    )
  }

  if (profileFetchError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Authentication Error
        </h3>
        <p className="text-red-700 mb-4">
          {profileFetchError}
        </p>
        <a href="/" className="bg-adme-600 text-white px-6 py-2 rounded-md hover:bg-adme-700 transition-colors font-bold">Go to Home</a>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {profile?.full_name || user.email}
          </span>
        </div>
        <Link
          href="/dashboard"
          className="bg-adme-500 text-white px-4 py-2 rounded-lg hover:bg-adme-600 transition-colors"
        >
          Dashboard
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={handleSignInClick}
          className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUpClick}
          className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
        >
          Sign Up
        </button>
      </div>

      {/* Sign In Modal */}
      {showSignInForm && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border-2 border-yellow-600 relative">
            <div className="flex flex-col items-center mb-6">
              <Image src="/assets/images/adme-logo.png" alt="Adme Logo" width={60} height={60} className="mb-2" />
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
                Just adme!
              </h2>
              <p className="text-yellow-700 text-sm font-light" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                Sign in to your account
              </p>
            </div>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <LoadingButton
                  type="submit"
                  loading={isSigningIn}
                  className="flex-1 bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
                >
                  Sign In
                </LoadingButton>
                <button
                  type="button"
                  onClick={handleCloseSignIn}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-400 transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                  <button
                    type="button"
                    onClick={handleShowPasswordReset}
                  className="text-yellow-700 hover:underline font-bold"
                  >
                    Forgot your password?
                  </button>
                </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToSignUp}
                  className="text-yellow-700 hover:underline font-bold"
                  >
                    Sign Up
                  </button>
              </div>
            </form>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md mt-4">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={showSignUpForm}
        onClose={() => setShowSignUpForm(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
    </>
  )
} 