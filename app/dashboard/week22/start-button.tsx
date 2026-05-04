'use client'

export default function StartWeek22Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 22 tracking? This will mark the current time as the start point for Week 22.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week22', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 22 tracking started! Refresh the page to see Week 22 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 22 tracking')
      }
    } catch (error) {
      alert('Error starting Week 22 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 22 Tracking
    </button>
  )
}
