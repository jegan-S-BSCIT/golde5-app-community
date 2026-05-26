import axios from 'axios'

const runTest = async () => {
  const content = `
    <h2>Test Email Triggered Successfully!</h2>
    <p>Hi Jegan,</p>
    <p>This is an automated test from your GOLDe5 fintech platform backend.</p>
    <p>The ZeptoMail integration via Node.js Express is working perfectly.</p>
    
    <table class="data-table" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <th style="padding: 12px; text-align: left; border-bottom: 1px solid #333; color: #A1A1AA;">Status</th>
        <td style="padding: 12px; text-align: left; border-bottom: 1px solid #333; font-weight: bold; color: #22C55E;">Verified & Connected</td>
      </tr>
      <tr>
        <th style="padding: 12px; text-align: left; border-bottom: 1px solid #333; color: #A1A1AA;">System</th>
        <td style="padding: 12px; text-align: left; border-bottom: 1px solid #333; font-weight: bold;">GOLDe5 Production Build</td>
      </tr>
      <tr>
        <th style="padding: 12px; text-align: left; border-bottom: 1px solid #333; color: #A1A1AA;">Time</th>
        <td style="padding: 12px; text-align: left; border-bottom: 1px solid #333; font-weight: bold;">${new Date().toLocaleString()}</td>
      </tr>
    </table>

    <center>
      <a href="https://golde5.com/" style="display: inline-block; padding: 12px 24px; background-color: #D4AF37; color: #000000; text-decoration: none; font-weight: bold; border-radius: 6px; margin-top: 20px;">Return to App</a>
    </center>
  `

  const payload = {
    to: 'sj7715395@gmail.com',
    name: 'GOLDe5 User',
    subject: 'ZeptoMail Integration Test - GOLDe5',
    htmlbody: `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; color: #FFFFFF; margin: 0; padding: 40px 10px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #222; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.05); }
        .header { padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #1A1A1A 0%, #0B0B0B 100%); border-bottom: 2px solid #D4AF37; }
        .logo { font-size: 32px; font-weight: 900; color: #FFFFFF; letter-spacing: 3px; margin: 0; text-transform: uppercase; }
        .logo span { color: #D4AF37; }
        .tagline { color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 8px; font-weight: bold; }
        .content { padding: 40px 30px; line-height: 1.6; color: #E5E5E5; }
        .content p { margin-top: 0; margin-bottom: 20px; font-size: 15px; }
        .footer { padding: 30px; text-align: center; background-color: #0A0A0A; border-top: 1px solid #222; }
        .trust-badges { margin-bottom: 20px; padding: 15px; background: rgba(212, 175, 55, 0.05); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.1); }
        .trust-badges p { color: #D4AF37; font-size: 12px; margin: 0; font-weight: bold; letter-spacing: 1px; }
        .footer-text { font-size: 11px; color: #666; line-height: 1.5; margin: 0; }
        h2 { color: #D4AF37; margin-top: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 20px; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">GOLD<span>e5</span></div>
            <div class="tagline">Digital Alchemy & Wealth</div>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <div class="trust-badges">
              <p>🔒 256-BIT ENCRYPTION • 🛡️ 100% INSURED • 🏛️ VAULT SECURED</p>
            </div>
            <p class="footer-text">This is an automated transactional email from GOLDe5.</p>
            <p class="footer-text">If you have any questions, please contact our support team at support@golde5.com</p>
            <p class="footer-text" style="margin-top: 15px;">&copy; ${new Date().getFullYear()} GOLDe5 Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  try {
    const res = await axios.post('http://localhost:5000/api/send-email', payload)
    console.log('API Response:', res.data)
  } catch (err) {
    console.error('API Error:', err.response?.data || err.message)
  }
}

runTest()
