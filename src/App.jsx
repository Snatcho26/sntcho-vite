import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function App() {
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
      if (res.ok) {
        navigate('/congrats')
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Error submitting form.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f9fafb'}}>
      <form onSubmit={handleSubmit} style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', width:'100%', maxWidth:'400px'}}>
        <h1 style={{marginBottom:'1rem', fontSize:'1.5rem'}}>Join the Snatcho Waitlist 🚀</h1>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{width:'100%', padding:'0.75rem', marginBottom:'1rem', borderRadius:'8px', border:'1px solid #ccc'}}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width:'100%', padding:'0.75rem', marginBottom:'1rem', borderRadius:'8px', border:'1px solid #ccc'}}
        />
        <button type="submit" disabled={loading} style={{width:'100%', padding:'0.75rem', borderRadius:'8px', border:'none', background:'#16a34a', color:'#fff', fontWeight:'bold'}}>
          {loading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
    </div>
  )
}
