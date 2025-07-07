'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase'
import LoadingButton from './LoadingButton'
import Image from 'next/image'

interface PasswordResetModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PasswordResetModal({ isOpen, onClose }: PasswordResetModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setIsLoading(false)
  }

  const handleClose = () => {
    setEmail('')
    setError(null)
    setSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  if (success) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border-2 border-yellow-600 relative">
          <div className="flex flex-col items-center">
            <Image src="/assets/images/adme-logo.png" alt="Adme Logo" width={60} height={60} className="mb-2" />
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
              Check Your Email!
            </h2>
            <p className="text-yellow-700 text-sm font-light mb-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              We&apos;ve sent a password reset link to <strong>{email}</strong>.<br />Please check your email and follow the instructions to reset your password.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border-2 border-yellow-600 relative">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/images/adme-logo.png" alt="Adme Logo" width={60} height={60} className="mb-2" />
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
            Reset Password
          </h2>
          <p className="text-yellow-700 text-sm font-light text-center" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          <div className="flex space-x-3 pt-2">
            <LoadingButton
              type="submit"
              loading={isLoading}
              className="flex-1 bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
              style={{ fontFamily: 'var(--font-londrina), sans-serif' }}
            >
              Send Reset Link
            </LoadingButton>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-400 transition-colors font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 