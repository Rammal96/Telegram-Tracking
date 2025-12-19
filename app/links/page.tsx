'use client'

import { useState } from 'react'

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
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://telegram-tracking.vercel.app'

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
                  <label className="text-yellow-400 text-sm mb-1 block font-semibold">⭐ Markdown (RECOMMENDED - No URL shows):</label>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-800 p-3 rounded text-sm text-gray-300 break-all">
                      {getMarkdownLink(region.slug)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getMarkdownLink(region.slug), region.slug)}
                      className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Paste this in Telegram - Only "New Maestro Tweet" will show, NO URL</p>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">HTML (for emails/websites):</label>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-800 p-3 rounded text-sm text-gray-300 break-all">
                      {getHtmlLink(region.slug)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getHtmlLink(region.slug), region.slug)}
                      className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-500 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-900/30 border border-yellow-400/30 rounded-lg">
          <p className="text-yellow-400 font-semibold mb-2">How to use (NO URL will show):</p>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li><strong>Markdown (RECOMMENDED):</strong> Copy and paste into Telegram - Shows ONLY "New Maestro Tweet" as clickable text, NO URL visible</li>
            <li><strong>HTML:</strong> Use in emails, websites, etc. - Shows ONLY "New Maestro Tweet" as clickable text</li>
            <li><strong>Plain URL:</strong> NOT recommended - Will show the URL in preview</li>
          </ul>
          <p className="text-yellow-400 mt-3 text-xs">💡 Tip: Use the Markdown format for Telegram - it will show only "New Maestro Tweet" with no URL visible!</p>
        </div>
      </div>
    </div>
  )
}

