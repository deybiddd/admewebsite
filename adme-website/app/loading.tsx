import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white z-50">
      <Image src="/assets/images/adme-logo.png" alt="Adme Logo" width={80} height={80} className="mb-4 animate-bounce" />
      <div className="flex items-center gap-2">
        <svg
          className="animate-spin h-7 w-7 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
        <span className="text-yellow-700 font-bold text-lg" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
          Loading…
        </span>
      </div>
    </div>
  )
} 