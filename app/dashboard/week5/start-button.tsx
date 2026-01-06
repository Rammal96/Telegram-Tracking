'use client'

export default function StartWeek5Button() {
  const handleStart = async () => {
    if (!confirm('Start Week 5 tracking? This will mark January 6, 2025 as the start point for Week 5.')) {
      return
    }

    try {
      const response = await fetch('/api/dashboard/start-week5', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Week 5 tracking started! Refresh the page to see Week 5 data.')
        window.location.reload()
      } else {
        alert('Failed to start Week 5 tracking')
      }
    } catch (error) {
      alert('Error starting Week 5 tracking')
    }
  }

  return (
    <button
      onClick={handleStart}
      className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-200"
    >
      Start Week 5 Tracking
    </button>
  )
}

