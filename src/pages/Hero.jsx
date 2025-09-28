import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
      const data = await res.json()
      if (data.success) {
        navigate('/congrats')
      } else {
        alert('Something went wrong: ' + data.error)
      }
    } catch (err) {
      alert('Failed: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 flex justify-center">
        <img src="/logo.png" alt="Snatcho" className="h-16" />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Snatcho</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">Compare prices from Amazon, Flipkart, Blinkit, Zepto & more.</p>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg" required />
          <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg" required />
          <button type="submit" disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            {loading ? 'Joining...' : 'Join the Waitlist'}
          </button>
        </form>
      </main>
    </div>
  )
}