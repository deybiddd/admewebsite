'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SignUpModal from './SignUpModal'
import ProfileModal from './ProfileModal'
import PasswordResetModal from './PasswordResetModal'
import Link from 'next/link'

export default function AuthButton() {
  const { user, profile, signIn, signOut, loading } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError(null)

    const { user, error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setShowSignInForm(false)
      setEmail('')
      setPassword('')
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
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded px-4 py-2 w-24 h-10"></div>
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
          className="border border-adme-500 text-adme-700 dark:text-adme-500 px-4 py-2 rounded-lg hover:bg-adme-500 hover:text-white transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUpClick}
          className="bg-adme-500 text-white px-4 py-2 rounded-lg hover:bg-adme-600 transition-colors"
        >
          Sign Up
        </button>
      </div>

      {/* Sign In Modal */}
      {showSignInForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md border-2 border-adme-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-adme-600 dark:text-adme-400 text-sm">
                Sign in to your ADME account
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

              {error && (
                <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="flex-1 bg-adme-500 text-white py-2 rounded-md hover:bg-adme-600 disabled:opacity-50 transition-colors font-medium"
                >
                  {isSigningIn ? 'Signing In...' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseSignIn}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <div>
                  <button
                    type="button"
                    onClick={handleShowPasswordReset}
                    className="text-adme-blue-600 dark:text-adme-blue-400 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
                <div>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToSignUp}
                    className="text-adme-blue-600 dark:text-adme-blue-400 hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
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