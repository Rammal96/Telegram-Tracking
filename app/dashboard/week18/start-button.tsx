'use client'

export default function StartWeek18Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 18 tracking? This will mark the current time as the start point for Week 18.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week18', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 18 tracking started! Refresh the page to see Week 18 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 18 tracking')
      }
    } catch (error) {
      alert('Error starting Week 18 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 18 Tracking
    </button>
  )
}
