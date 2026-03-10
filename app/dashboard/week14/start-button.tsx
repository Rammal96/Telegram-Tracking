'use client'

export default function StartWeek14Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 14 tracking? This will mark the current time as the start point for Week 14.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week14', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 14 tracking started! Refresh the page to see Week 14 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 14 tracking')
      }
    } catch (error) {
      alert('Error starting Week 14 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 14 Tracking
    </button>
  )
}
