'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useRouter } from 'next/navigation'

interface Click {
  id: string
  region: string
  timestamp: string
  ip: string
  user_agent: string
  referer: string
}

interface DashboardClientProps {
  clicks: Click[]
  regionData: { region: string; clicks: number }[]
  timeChartData: { date: string; clicks: number }[]
  totalClicks: number
  regionCounts: Record<string, number>
  title?: string
  startTime?: string | null
  tweetCount?: number
}

export default function DashboardClient({ clicks, regionData, timeChartData, totalClicks, regionCounts, title = "Tracking Dashboard", startTime, tweetCount }: DashboardClientProps) {
  const router = useRouter()
  
  // Extract current week from title
  const getCurrentWeek = () => {
    const match = title.match(/Week (\d+)/)
    if (match) return parseInt(match[1])
    return 1 // Default to Week 1
  }

  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const week = e.target.value
    if (week === '1') {
      router.push('/dashboard')
    } else {
      router.push(`/dashboard/week${week}`)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 tracking-tight">
              {title}
            </h1>
            {startTime && (
              <p className="text-gray-400 text-sm mt-2">
                Tracking from: {new Date(startTime).toLocaleString('en-US')}
              </p>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <select
              value={getCurrentWeek()}
              onChange={handleWeekChange}
              className="px-4 py-2.5 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer"
            >
              <option value="1">Week 1</option>
              <option value="2">Week 2</option>
              <option value="3">Week 3</option>
              <option value="4">Week 4</option>
              <option value="5">Week 5</option>
              <option value="6">Week 6</option>
              <option value="7">Week 7</option>
              <option value="8">Week 8</option>
              <option value="9">Week 9</option>
              <option value="10">Week 10</option>
              <option value="11">Week 11</option>
            </select>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg shadow-yellow-400/30"
            >
              Refresh
            </button>
            <button 
              onClick={async () => {
                await fetch('/api/dashboard/logout', { method: 'POST' })
                window.location.href = '/dashboard/login'
              }}
              className="px-6 py-2.5 bg-gray-700 text-gray-200 font-bold rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${tweetCount !== undefined ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 mb-8`}>
          <div className="bg-gray-900/90 border border-yellow-400/20 p-6 rounded-lg shadow-xl hover:border-yellow-400/40 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2 text-gray-400">Total Clicks</h2>
            <p className="text-5xl font-bold text-yellow-400">{totalClicks}</p>
          </div>

          <div className="bg-gray-900/90 border border-yellow-400/20 p-6 rounded-lg shadow-xl hover:border-yellow-400/40 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2 text-gray-400">Regions Tracked</h2>
            <p className="text-5xl font-bold text-yellow-400">{Object.keys(regionCounts).length}</p>
          </div>

          {tweetCount !== undefined && (
            <div className="bg-gray-900/90 border border-yellow-400/20 p-6 rounded-lg shadow-xl hover:border-yellow-400/40 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-2 text-gray-400">Number of Tweets</h2>
              <p className="text-5xl font-bold text-yellow-400">{tweetCount}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/90 border border-yellow-400/20 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Clicks per Region</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionData} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="region" 
                  stroke="#9CA3AF" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #FCD34D',
                    borderRadius: '8px',
                    color: '#FCD34D'
                  }} 
                />
                <Bar dataKey="clicks" fill="#FCD34D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900/90 border border-yellow-400/20 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Clicks Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #FCD34D',
                    borderRadius: '8px',
                    color: '#FCD34D'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#FCD34D" 
                  strokeWidth={3}
                  dot={{ fill: '#FCD34D', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900/90 border border-yellow-400/20 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">All Click Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-950">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">User Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Referer</th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-gray-800">
                {clicks.map((click: Click) => (
                  <tr key={click.id} className="hover:bg-gray-900 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">{click.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(click.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{click.ip}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 truncate max-w-xs">{click.user_agent}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 truncate max-w-xs">{click.referer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

