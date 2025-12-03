'use client'

export default function StartWeek2Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 2 tracking? This will mark the current time as the start point for Week 2.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week2', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 2 tracking started! Refresh the page to see Week 2 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 2 tracking')
      }
    } catch (error) {
      alert('Error starting Week 2 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 2 Tracking
    </button>
  )
}

