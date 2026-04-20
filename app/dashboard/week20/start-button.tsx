'use client'

export default function StartWeek20Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 20 tracking? This will mark the current time as the start point for Week 20.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week20', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 20 tracking started! Refresh the page to see Week 20 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 20 tracking')
      }
    } catch (error) {
      alert('Error starting Week 20 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 20 Tracking
    </button>
  )
}
