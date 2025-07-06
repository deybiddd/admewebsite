'use client'

import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Inter, Londrina_Solid } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const londrina = Londrina_Solid({ weight: '400', subsets: ['latin'], variable: '--font-londrina' })

export default function Dashboard() {
  const { user, profile, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'security'>('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    companyName: profile?.company_name || '',
    phone: profile?.phone || ''
  })
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || '',
        companyName: profile.company_name || '',
        phone: profile.phone || ''
      })
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setIsUpdating(true)
    setError(null)
    setSuccess(null)

    const updates = {
      full_name: formData.fullName,
      company_name: formData.companyName || null,
      phone: formData.phone || null,
    }

    const updatedProfile = await updateProfile(updates)
    
    if (updatedProfile) {
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccess(null), 3000)
    } else {
      setError('Failed to update profile. Please try again.')
    }
    
    setIsUpdating(false)
  }

  const cancelEdit = () => {
    setFormData({
      fullName: profile?.full_name || '',
      companyName: profile?.company_name || '',
      phone: profile?.phone || ''
    })
    setIsEditing(false)
    setError(null)
  }

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-white ${inter.variable}`}>
        {/* Header */}
        <header className="bg-white image.pnggetting -sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-2xl font-bold mb-0" style={{ fontFamily: 'var(--font-londrina), sans-serif', color: '#171717', textTransform: 'lowercase', letterSpacing: '0.02em' }}>
                  adme
                </Link>
                <span className="text-gray-300 font-light">/</span>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-adme-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-adme-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {profile?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {success}
            </div>
          )}
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow-sm p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        activeTab === 'overview'
                          ? 'bg-adme-100 text-adme-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-adme-100 text-adme-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Profile Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        activeTab === 'projects'
                          ? 'bg-adme-100 text-adme-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      My Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        activeTab === 'security'
                          ? 'bg-adme-100 text-adme-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Security
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Welcome Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!
                        </h2>
                        <p className="text-gray-500 mt-1 font-light">
                          Here&apos;s an overview of your account activity
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-adme-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-adme-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-light text-gray-500">Active Projects</p>
                          <p className="text-2xl font-semibold text-gray-900">0</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-light text-gray-500">Completed</p>
                          <p className="text-2xl font-semibold text-gray-900">0</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-light text-gray-500">Member Since</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(profile?.created_at || '').toLocaleDateString('en-US', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link 
                        href="/#contact"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-adme-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-adme-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Start New Project</p>
                          <p className="text-sm text-gray-500 font-light">Contact us for your next project</p>
                        </div>
                      </Link>

                      <button 
                        onClick={() => setActiveTab('profile')}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Update Profile</p>
                          <p className="text-sm text-gray-500 font-light">Keep your information current</p>
                        </div>
                      </button>
                    </div>

                    {/* Discovery Call CTA */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-adme-50 to-adme-blue-50 rounded-lg border border-adme-200 flex flex-col items-center">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-wide">
                          Ready to Start Your Project?
                        </h3>
                        <p className="text-gray-600 mb-4 font-light">
                          Choose how you want to get started:
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
                        <Link 
                          href="/#contact"
                          className="flex flex-col justify-center items-center text-center min-h-[64px] bg-white border border-yellow-600 text-yellow-600 font-bold text-lg px-8 py-3 rounded-full shadow-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-transparent transition-all duration-200 transform hover:scale-105 hover:shadow-2xl"
                          style={{ fontFamily: 'var(--font-londrina), sans-serif' }}
                        >
                          Start New Project
                        </Link>
                        <a
                          href="https://calendly.com/alvarado-daviddd/intro-to-your-business-growth-with-adme"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col justify-center items-center text-center min-h-[64px] bg-white border border-yellow-600 text-yellow-600 font-bold text-lg px-8 py-3 rounded-full shadow-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-transparent transition-all duration-200 transform hover:scale-105 hover:shadow-2xl"
                          style={{ fontFamily: 'var(--font-londrina), sans-serif' }}
                        >
                          Schedule 1-on-1 Call
                        </a>
                        <a
                          href="https://www.figma.com/proto/44te88XW6xUpa5u8CmJBDH/adme-Company-Profile?node-id=2-3&starting-point-node-id=2%3A3&t=jfDr6W9D4AneRLQX-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col justify-center items-center text-center min-h-[64px] bg-white border border-yellow-600 text-yellow-600 font-bold text-lg px-8 py-3 rounded-full shadow-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-transparent transition-all duration-200 transform hover:scale-105 hover:shadow-2xl"
                          style={{ fontFamily: 'var(--font-londrina), sans-serif' }}
                        >
                          Check our company profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Settings Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Profile Settings
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-adme-600 text-white px-4 py-2 rounded-md hover:bg-adme-700 transition-colors font-bold"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  <div className="space-y-6">
                    {/* Profile Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 font-bold focus:ring-2 focus:ring-adme-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 text-gray-800 font-bold bg-gray-50 rounded-md">
                            {profile?.full_name || 'Not provided'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <p className="px-3 py-2 text-gray-800 font-bold bg-gray-50 rounded-md">
                          {user?.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Email cannot be changed from this form
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Company Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 font-bold focus:ring-2 focus:ring-adme-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 text-gray-800 font-bold bg-gray-50 rounded-md">
                            {profile?.company_name || 'Not provided'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 font-bold focus:ring-2 focus:ring-adme-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 text-gray-800 font-bold bg-gray-50 rounded-md">
                            {profile?.phone || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Account Information */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-700 font-bold">Role:</span>
                          <span className="ml-2 capitalize font-bold text-gray-800">
                            {profile?.role}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-700 font-bold">Member since:</span>
                          <span className="ml-2 font-bold text-gray-800">
                            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not provided'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    {isEditing && (
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={handleSave}
                          disabled={isUpdating}
                          className="bg-adme-600 text-white px-6 py-2 rounded-md hover:bg-adme-700 transition-colors font-bold"
                        >
                          {isUpdating ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    My Projects
                  </h2>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No projects yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start your first project by contacting us
                    </p>
                    <Link 
                      href="/#contact"
                      className="bg-adme-500 text-white px-6 py-2 rounded-md hover:bg-adme-600 transition-colors"
                    >
                      Start New Project
                    </Link>
                  </div>

                  {/* Discovery Call CTA for Projects Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-adme-50 to-adme-blue-50 rounded-lg border border-adme-200">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ready to Start Your Project?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Schedule a discovery call with our team to discuss your project requirements
                      </p>
                      <div className="relative inline-block">
                        <div className="absolute inset-0 animate-rotate-border rounded-full p-1"></div>
                        <Link 
                          href="/#contact"
                          className="relative bg-adme-500 text-white px-8 py-3 rounded-full font-medium hover:bg-adme-600 transition-colors animate-pulse-glow"
                        >
                          Schedule Discovery Call
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Security Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Password
                          </h3>
                          <p className="text-sm text-gray-500">
                            Last updated: Never
                          </p>
                        </div>
                        <button className="text-adme-600 hover:text-adme-500 text-sm font-medium">
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className="text-adme-600 hover:text-adme-500 text-sm font-medium">
                          Enable
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Active Sessions
                          </h3>
                          <p className="text-sm text-gray-500">
                            Manage your active sessions across devices
                          </p>
                        </div>
                        <button className="text-adme-600 hover:text-adme-500 text-sm font-medium">
                          View Sessions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 