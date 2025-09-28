import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
  const { name, email } = req.body

  try {
    // Insert into Supabase
    await supabase.from('waitinglist').insert([{ name, email }])

    // Send email via Resend
    await resend.emails.send({
      from: 'Snatcho <hello@snatchoindia.com>',
      to: email,
      subject: 'Welcome to Snatcho 🎉',
      html: `<h1>Hi ${name}, welcome to Snatcho!</h1>
             <p>You’re officially on the waitlist.</p>
             <p>Your reward coupon: <b>SNATCHFORCE</b></p>
             <p>Valid for 45 days after launch 🚀</p>`
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
  }
}