
import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Congrats(){
  useEffect(()=>{
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } })
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
      <div className="max-w-xl w-full bg-white/10 p-8 rounded-2xl text-center">
        <img src="/logo.png" alt="Snatcho" className="mx-auto w-28 mb-4" />
        <h1 className="text-3xl font-bold mb-2">🎉 You’re on the Snatch Force!</h1>
        <p className="mb-4">Thanks — you’re now on the Snatcho waitlist and part of our early community of deal-hunters.</p>
        <div className="bg-white rounded-lg p-4 inline-block">
          <div className="font-bold text-lg text-slate-900">SNATCHFORCE</div>
          <div className="text-sm text-slate-600">20% OFF — valid 45 days after app launch</div>
        </div>
        <div className="mt-6">
          <a href="https://www.instagram.com/snatchoindia/?hl=en" target="_blank" rel="noreferrer" className="inline-block bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold">Follow us on Instagram</a>
        </div>
      </div>
    </div>
  )
}
