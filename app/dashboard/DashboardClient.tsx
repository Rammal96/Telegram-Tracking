'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

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
}

export default function DashboardClient({ clicks, regionData, timeChartData, totalClicks, regionCounts }: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tracking Dashboard</h1>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Clicks</h2>
            <p className="text-4xl font-bold text-blue-600">{totalClicks}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Regions Tracked</h2>
            <p className="text-4xl font-bold text-green-600">{Object.keys(regionCounts).length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Clicks per Region</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Clicks Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Last 50 Click Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referer</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clicks.map((click: Click) => (
                  <tr key={click.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{click.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(click.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{click.ip}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{click.user_agent}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{click.referer}</td>
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

