'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const VALID_REGIONS = [
  'turkey',
  'russia',
  'india',
  'china',
  'vietnam',
  'indonesia',
  'germany',
  'france',
  'arabic',
  'nigeria',
  'tagalog',
  'portugal',
  'spain',
  'malay'
]

const REGION_NAMES: Record<string, string> = {
  'turkey': 'Turkey',
  'russia': 'Russia',
  'india': 'India',
  'china': 'China',
  'vietnam': 'Vietnam',
  'indonesia': 'Indonesia',
  'germany': 'Germany',
  'france': 'France',
  'arabic': 'Arabic',
  'nigeria': 'Nigeria',
  'tagalog': 'Tagalog',
  'portugal': 'Portugal',
  'spain': 'Spain',
  'malay': 'Malay'
}

export default function RegionPage() {
  const params = useParams()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  
  const region = (params?.region as string)?.toLowerCase() || ''
  
  useEffect(() => {
    if (!VALID_REGIONS.includes(region)) {
      router.push('/')
    }
  }, [region, router])

  if (!VALID_REGIONS.includes(region)) {
    return null
  }

  const handleClick = () => {
    setIsRedirecting(true)
    // Redirect to tracking endpoint which will track and redirect to Twitter
    window.location.href = `/api/track/${region}`
  }

  const regionName = REGION_NAMES[region] || region

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-900 border-2 border-yellow-400/30 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                New Maestro Tweet
              </h1>
              <p className="text-gray-400 text-sm">
                {regionName} Region
              </p>
            </div>
          
          <button
            onClick={handleClick}
            disabled={isRedirecting}
            className="w-full px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isRedirecting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting...
              </span>
            ) : (
              'View Tweet'
            )}
          </button>
          
          <p className="text-gray-500 text-xs mt-6">
            Click the button above to view the latest Maestro tweet
          </p>
        </div>
      </div>
    </div>
  )
}

