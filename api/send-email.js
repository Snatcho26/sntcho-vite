import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { name, email } = req.body
    if (!email || !name) {
      return res.status(400).json({ message: 'Missing name or email' })
    }

    // Insert into Supabase
    await supabase.from('waitinglist').insert([{ name, email }])

    // Add to Brevo list
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name },
        listIds: [5]
      })
    })

    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}
