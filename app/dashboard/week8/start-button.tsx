'use client'

export default function StartWeek8Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 8 tracking? This will mark the current time as the start point for Week 8.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week8', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 8 tracking started! Refresh the page to see Week 8 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 8 tracking')
      }
    } catch (error) {
      alert('Error starting Week 8 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 8 Tracking
    </button>
  )
}
