'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import LoadingButton from './LoadingButton'
import Image from 'next/image'

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const { signUp } = useAuth()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningUp(true)
    setError(null)
    
    console.log('Starting sign up process...')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsSigningUp(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsSigningUp(false)
      return
    }

    try {
      console.log('Calling signUp function...')
      const { user, error } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.fullName,
          company_name: formData.companyName
        }
      )
      
      console.log('SignUp result:', { user: !!user, error: error?.message })
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          companyName: ''
        })
      }
    } catch (err) {
      console.error('Sign up error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSigningUp(false)
      console.log('Sign up process completed')
    }
  }

  const handleClose = () => {
    setError(null)
    setSuccess(false)
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      companyName: ''
    })
    onClose()
  }

  if (!isOpen) return null

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md border-2 border-adme-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Check Your Email!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We&apos;ve sent you a confirmation link. Please check your email and click the link to activate your account.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-adme-500 text-white py-2 rounded-md hover:bg-adme-600 transition-colors font-medium"
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
      <div className="bg-white p-8 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-yellow-600 relative">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/images/adme-logo.png" alt="Adme Logo" width={60} height={60} className="mb-2" />
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
            Just adme!
          </h2>
          <p className="text-yellow-700 text-sm font-light" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Create your account to get started
          </p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-adme-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <LoadingButton
              type="submit"
              loading={isSigningUp}
              className="flex-1 bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
            >
              Sign Up
            </LoadingButton>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-400 transition-colors font-bold"
            >
              Cancel
            </button>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-yellow-700 hover:underline font-bold"
            >
              Sign In
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">We&apos;ll never share your email.</p>
        </form>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  )
} 