'use client'

export default function StartWeek7Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 7 tracking? This will mark the current time as the start point for Week 7.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week7', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 7 tracking started! Refresh the page to see Week 7 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 7 tracking')
      }
    } catch (error) {
      alert('Error starting Week 7 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 7 Tracking
    </button>
  )
}
