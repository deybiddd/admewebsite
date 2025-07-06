import React from 'react'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export default function LoadingButton({ loading, children, disabled, className, ...props }: LoadingButtonProps) {
  return (
    <button
      className={`bg-white border border-yellow-600 text-yellow-600 font-bold px-6 py-2 rounded-full shadow-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-transparent transition-all duration-200 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed ${className || ''}`}
      style={{ fontFamily: 'var(--font-londrina), sans-serif' }}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
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
      )}
      <span>{loading ? 'Loading…' : children}</span>
    </button>
  )
} 