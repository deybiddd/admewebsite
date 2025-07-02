import React from 'react'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export default function LoadingButton({ loading, children, disabled, ...props }: LoadingButtonProps) {
  return (
    <button
      className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg flex items-center justify-center gap-2 transition-colors hover:bg-yellow-700 disabled:opacity-80 disabled:cursor-not-allowed"
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
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
      )}
      <span>{loading ? 'Loading…' : children}</span>
    </button>
  )
} 