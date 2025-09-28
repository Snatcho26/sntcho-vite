
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })

  try {
    const { name, email } = req.body
    if (!email || !name) return res.status(400).json({ message: 'Missing name or email' })

    // 1) insert into Supabase waitinglist
    await supabase.from('waitinglist').insert([{ name, email }])

    // 2) add to Brevo (list id 5)
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
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

    // ignore duplicate errors gracefully
    if (brevoRes.status >= 400) {
      const body = await brevoRes.json().catch(()=>null)
      // if duplicate contact, try update
      if (body && body.code === 'duplicate_parameter') {
        await fetch(`https://api.brevo.com/v3/contacts/${email}`, {
          method:'PUT',
          headers:{
            'accept':'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type':'application/json'
          },
          body: JSON.stringify({ attributes: { FIRSTNAME: name } })
        })
      }
    }

    return res.status(200).json({ message: 'ok' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'server error', error: String(err) })
  }
}
