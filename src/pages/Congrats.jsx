import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Congrats() {
  useEffect(() => {
    confetti({ particleCount: 150, spread: 80 })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <img src="/logo.png" alt="Snatcho" className="h-20 mb-6" />
      <h1 className="text-3xl md:text-5xl font-bold mb-4">🎉 Congratulations!</h1>
      <p className="text-lg text-gray-600 mb-6">You're officially on the Snatcho waitlist.</p>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-lg">Your reward coupon:</p>
        <p className="text-2xl font-bold text-green-600">SNATCHFORCE</p>
        <p className="text-sm text-gray-500 mt-2">Valid for 45 days post launch</p>
      </div>
    </div>
  )
}