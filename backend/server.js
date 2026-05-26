import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const ZEPTO_API_KEY = process.env.ZEPTO_API_KEY || "Zoho-enczapikey PHtE6r0MQurv2mZ9pBUI4fG6FsGmN9l/+LtkLQgUsodGCKALGk1VqIwsxjC0okgoAflDFqadmtlrsr/Ptu2FcD7qPGwZWWqyqK3sx/VYSPOZsbq6x00cuV8YdUHdXILnddBu1CLWs9jdNA=="
const ZEPTO_URL = "https://api.zeptomail.in/v1.1/email"

app.post('/api/send-email', async (req, res) => {
  const { to, name, subject, htmlbody } = req.body

  if (!to || !subject || !htmlbody) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const payload = {
    from: { address: "noreply@golde5.com", name: "GOLDe5" },
    to: [
      {
        email_address: {
          address: to,
          name: name || "GOLDe5 Investor"
        }
      }
    ],
    subject: subject,
    htmlbody: htmlbody
  }

  try {
    const response = await axios.post(ZEPTO_URL, payload, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': ZEPTO_API_KEY
      }
    })
    
    console.log('✅ Email sent successfully to', to)
    res.status(200).json({ success: true, data: response.data })
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.data || error.message)
    res.status(500).json({ success: false, error: 'Failed to send email' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Email Service running on port ${PORT}`)
})
