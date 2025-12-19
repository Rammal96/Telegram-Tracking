'use client'

import { useState, useEffect } from 'react'

const REGIONS = [
  { slug: 'turkey', name: 'Turkey' },
  { slug: 'russia', name: 'Russia' },
  { slug: 'india', name: 'India' },
  { slug: 'china', name: 'China' },
  { slug: 'vietnam', name: 'Vietnam' },
  { slug: 'indonesia', name: 'Indonesia' },
  { slug: 'germany', name: 'Germany' },
  { slug: 'france', name: 'France' },
  { slug: 'arabic', name: 'Arabic' },
  { slug: 'nigeria', name: 'Nigeria' },
  { slug: 'tagalog', name: 'Tagalog' },
  { slug: 'portugal', name: 'Portugal' },
  { slug: 'spain', name: 'Spain' },
  { slug: 'malay', name: 'Malay' },
]

export default function LinksPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState<string>('')

  // Set baseUrl only on client side to avoid hydration mismatch
  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const copyToClipboard = (text: string, region: string) => {
    navigator.clipboard.writeText(text)
    setCopied(region)
    setTimeout(() => setCopied(null), 2000)
  }

  const getMarkdownLink = (slug: string) => {
    return `[New Maestro Tweet](${baseUrl}/${slug})`
  }

  const getHtmlLink = (slug: string) => {
    return `<a href="${baseUrl}/${slug}">New Maestro Tweet</a>`
  }

  const getPlainLink = (slug: string) => {
    return `${baseUrl}/${slug}`
  }

  // Don't render links until baseUrl is set (client-side only)
  if (!baseUrl) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading links...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Tracking Links</h1>
        <p className="text-gray-400 mb-6">Copy these links to share. They will appear as "New Maestro Tweet" hyperlinks.</p>
        
        <div className="space-y-6">
          {REGIONS.map((region) => (
            <div key={region.slug} className="bg-gray-900 border border-yellow-400/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-yellow-400">{region.name}</h2>
                {copied === region.slug && (
                  <span className="text-green-400 text-sm">✓ Copied!</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-yellow-400 text-sm mb-1 block font-semibold">⭐ URL (Copy this for Method 1):</label>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-800 p-3 rounded text-sm text-gray-300 break-all">
                      {getPlainLink(region.slug)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getPlainLink(region.slug), region.slug)}
                      className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
                    >
                      Copy URL
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Use this URL with Telegram's link button (see instructions below)</p>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Markdown (Alternative - shows URL below):</label>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-800 p-3 rounded text-sm text-gray-300 break-all">
                      {getMarkdownLink(region.slug)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getMarkdownLink(region.slug), region.slug)}
                      className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-500 transition"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Note: In Telegram, this shows the URL below the link text</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-900/30 border border-yellow-400/30 rounded-lg">
          <p className="text-yellow-400 font-semibold mb-2">How to create a "New Maestro Tweet" hyperlink in Telegram:</p>
          <div className="text-gray-300 text-sm space-y-3">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-yellow-400 font-semibold mb-2">Method 1: Telegram Link Button (BEST - No URL shows):</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Type: <code className="bg-gray-900 px-2 py-1 rounded">New Maestro Tweet</code></li>
                <li>Select the text "New Maestro Tweet"</li>
                <li>Tap the <strong>link icon</strong> (or use the menu → "Add Link")</li>
                <li>Paste this URL: <code className="bg-gray-900 px-2 py-1 rounded break-all">{baseUrl}/{'{region}'}</code></li>
                <li>Send - It will show as clickable "New Maestro Tweet" with NO URL visible!</li>
              </ol>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-yellow-400 font-semibold mb-2">Method 2: Markdown (Shows URL below):</p>
              <p className="mb-2">Copy the Markdown format below - It works but shows the URL below the link text.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

