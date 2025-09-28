
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function App(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try{
      const res = await fetch('/api/send-email', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name, email })
      })
      const data = await res.json()
      if(res.ok){
        navigate('/congrats')
      } else {
        setErr(data?.message || 'Failed to sign up')
      }
    }catch(err){
      console.error(err)
      setErr('Network error')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <header className="w-full max-w-4xl text-center mb-8">
        <img src="/logo.png" alt="Snatcho" className="mx-auto w-36 mb-4" />
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Snatch the Best Deals <span className="text-yellow-400">⚡</span></h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Compare prices from Amazon, Flipkart, Blinkit, Zepto &amp; more. Get exclusive discounts and student offers — all in one app.</p>
      </header>

      <main className="w-full max-w-xl">
        <div className="glass rounded-2xl p-8 shadow-lg">
          <form onSubmit={submit} className="space-y-4">
            <input className="w-full p-4 rounded-lg border border-slate-200" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="w-full p-4 rounded-lg border border-slate-200" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required type="email" />
            <div className="flex items-center text-sm text-slate-600">
              <input id="consent" type="checkbox" defaultChecked className="mr-2" />
              <label htmlFor="consent">I agree to receive emails from Snatcho.</label>
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-yellow-400 font-bold shadow hover:scale-[1.01] transition disabled:opacity-60" disabled={loading}>
              {loading ? 'Joining...' : 'Join the Waitlist'}
            </button>
            {err && <p className="text-red-600 text-sm">{err}</p>}
            <p className="text-xs text-slate-500 mt-2">By joining you agree to receive periodic emails. Unsubscribe anytime.</p>
          </form>
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        © 2025 Snatcho — Snatch the best deal.
      </footer>
    </div>
  )
}
