import axios from 'axios'

const API_URL = 'http://localhost:5000/api/send-email'

// Helper to generate the premium email HTML structure with GOLDe5 branding
const generateEmailHTML = (content) => `
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
  .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FBBF24 0%, #D4AF37 50%, #B8960F 100%); color: #000000; text-decoration: none; font-weight: 800; font-size: 14px; border-radius: 8px; margin-top: 10px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); }
  .data-box { background-color: #1A1A1A; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #333; }
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th, .data-table td { padding: 12px 5px; text-align: left; border-bottom: 1px solid #2A2A2A; }
  .data-table tr:last-child th, .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #888; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; width: 40%; }
  .data-table td { font-weight: 700; color: #FFF; font-size: 15px; text-align: right; }
  h2 { color: #D4AF37; margin-top: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 20px; }
  .highlight { color: #22C55E; font-weight: bold; }
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

export const sendGoldPurchaseEmail = async (userEmail, userName, transaction) => {
  const content = `
    <h2>Purchase Successful!</h2>
    <p>Hi ${userName || 'Investor'},</p>
    <p>Your recent gold purchase was successful and has been added to your secure vault.</p>
    
    <table class="data-table">
      <tr>
        <th>Transaction ID</th>
        <td>#${transaction.id}</td>
      </tr>
      <tr>
        <th>Asset</th>
        <td>24K Digital Gold (99.99%)</td>
      </tr>
      <tr>
        <th>Amount Paid</th>
        <td>₹${Math.abs(transaction.amount).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <th>Date & Time</th>
        <td>${transaction.date}</td>
      </tr>
    </table>

    <center>
      <a href="https://golde5.com/portfolio" class="btn">View Portfolio</a>
    </center>
  `
  
  try {
    await axios.post(API_URL, {
      to: userEmail,
      name: userName,
      subject: "Your Gold Purchase is Successful – GOLDe5",
      htmlbody: generateEmailHTML(content)
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

export const sendSipCreationEmail = async (userEmail, userName, sip) => {
  const content = `
    <h2>SIP Started Successfully!</h2>
    <p>Hi ${userName || 'Investor'},</p>
    <p>You have successfully set up a new Systematic Investment Plan for Digital Gold.</p>
    
    <table class="data-table">
      <tr>
        <th>SIP Amount</th>
        <td>₹${sip.amount.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <th>Frequency</th>
        <td>${sip.frequency}</td>
      </tr>
      <tr>
        <th>Duration</th>
        <td>${sip.duration} Years</td>
      </tr>
      <tr>
        <th>Next Auto-debit</th>
        <td>${sip.nextDate}</td>
      </tr>
    </table>
    
    <p>Consistency is the key to wealth generation. Your digital gold is securely vaulted and insured.</p>

    <center>
      <a href="https://golde5.com/portfolio" class="btn">Manage SIPs</a>
    </center>
  `
  
  try {
    await axios.post(API_URL, {
      to: userEmail,
      name: userName,
      subject: "SIP Activated Successfully – GOLDe5",
      htmlbody: generateEmailHTML(content)
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

export const sendWelcomeEmail = async (userEmail, userName) => {
  const content = `
    <h2>Welcome to GOLDe5!</h2>
    <p>Hi ${userName || 'Investor'},</p>
    <p>Your account has been successfully created. You can now start investing in 24K Digital Gold and Silver instantly.</p>
    <p>Features you can explore:</p>
    <ul>
      <li>Automate your savings with Gold SIPs</li>
      <li>Buy & Sell at live market rates</li>
      <li>Refer friends and earn rewards</li>
    </ul>
    <br/>
    <center>
      <a href="https://golde5.com/" class="btn">Start Investing</a>
    </center>
  `
  
  try {
    await axios.post(API_URL, {
      to: userEmail,
      name: userName,
      subject: "Welcome to GOLDe5 Digital Investments",
      htmlbody: generateEmailHTML(content)
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}
