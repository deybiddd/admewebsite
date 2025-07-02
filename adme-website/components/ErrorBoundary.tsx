'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed bottom-4 left-4 bg-red-900 bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm">
          <h3 className="font-bold mb-2">⚠️ Component Error</h3>
          <p className="text-red-300">
            Connection test failed to load
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
} 