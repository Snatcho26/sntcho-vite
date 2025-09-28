import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Congrats() {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f9fafb', textAlign:'center'}}>
      <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', maxWidth:'500px'}}>
        <h1 style={{fontSize:'2rem', marginBottom:'1rem'}}>🎉 You’re on the Snatcho Waitlist!</h1>
        <p style={{marginBottom:'1rem'}}>Thanks for joining <strong>Snatch Force</strong>. You’ll be the first to know when we launch.</p>
        <p style={{fontSize:'1.25rem', fontWeight:'bold', marginBottom:'1rem'}}>Your reward code:</p>
        <div style={{background:'#16a34a', color:'#fff', padding:'0.75rem 1rem', borderRadius:'8px', display:'inline-block', fontSize:'1.25rem', fontWeight:'bold'}}>
          SNATCHFORCE
        </div>
        <p style={{marginTop:'1rem', color:'#555'}}>Use this for <strong>20% OFF</strong> – valid 45 days after app launch.</p>
      </div>
    </div>
  )
}
