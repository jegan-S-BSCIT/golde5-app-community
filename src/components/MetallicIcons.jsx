import React from 'react'

// Realistic 3D Shiny Gold Coin
export function GoldCoinIcon({ className = "w-12 h-12", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Coin Body Shading */}
        <radialGradient id="goldCoinBody" cx="45%" cy="45%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="45%" stopColor="#F5B041" />
          <stop offset="80%" stopColor="#D35400" />
          <stop offset="100%" stopColor="#7E5109" />
        </radialGradient>

        {/* Inner Coin Ring */}
        <linearGradient id="goldCoinInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7DC6F" />
          <stop offset="50%" stopColor="#B7950B" />
          <stop offset="100%" stopColor="#7E5109" />
        </linearGradient>

        {/* Shiny Highlight overlay */}
        <linearGradient id="shineOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>

        <filter id="coinShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Main Outer Rim Shadow */}
      <circle cx="50" cy="50" r="46" fill="#5E3F05" />

      {/* Coin base with 3D shadow */}
      <circle cx="50" cy="50" r="44" fill="url(#goldCoinBody)" filter="url(#coinShadow)" />

      {/* Rim bevel details */}
      <circle cx="50" cy="50" r="39" stroke="url(#goldCoinInner)" strokeWidth="3" fill="none" opacity="0.9" />
      <circle cx="50" cy="50" r="35" stroke="#9A7D0A" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.6" />

      {/* Emblem: 3D embossed 'G' for GOLDe5 with crown/stars */}
      <g transform="translate(50, 50)">
        {/* Embossed stars */}
        <path d="M 0,-24 L 2,-18 L 8,-18 L 3,-14 L 5,-8 L 0,-12 L -5,-8 L -3,-14 L -8,-18 L -2,-18 Z" fill="#F4D03F" opacity="0.8" />

        {/* The elegant central G */}
        <text x="0" y="14" fill="#FDFEFE" fontSize="28" fontWeight="900" fontFamily="'Georgia', serif" textAnchor="middle" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.5))">
          G
        </text>

        {/* Subtle ribbon/banner beneath G */}
        <path d="M -15,18 L 15,18 L 10,23 L -10,23 Z" fill="#9A7D0A" />
      </g>

      {/* Glossy overlay */}
      <circle cx="50" cy="50" r="44" fill="url(#shineOverlay)" style={{ mixBlendMode: 'overlay' }} />
    </svg>
  )
}

// Realistic 3D Polished Silver Coin
export function SilverCoinIcon({ className = "w-12 h-12", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Silver Body Shading */}
        <radialGradient id="silverCoinBody" cx="45%" cy="45%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E5E8E8" />
          <stop offset="75%" stopColor="#95A5A6" />
          <stop offset="100%" stopColor="#34495E" />
        </radialGradient>

        {/* Inner Silver Ring */}
        <linearGradient id="silverCoinInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2F4F4" />
          <stop offset="50%" stopColor="#BDC3C7" />
          <stop offset="100%" stopColor="#566573" />
        </linearGradient>

        <filter id="silverShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Rim Base */}
      <circle cx="50" cy="50" r="46" fill="#2C3E50" />

      {/* Coin base */}
      <circle cx="50" cy="50" r="44" fill="url(#silverCoinBody)" filter="url(#silverShadow)" />

      {/* Inner details */}
      <circle cx="50" cy="50" r="39" stroke="url(#silverCoinInner)" strokeWidth="3" fill="none" opacity="0.9" />
      <circle cx="50" cy="50" r="35" stroke="#7F8C8D" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />

      {/* Emblem: 'S' for Silver inside */}
      <g transform="translate(50, 50)">
        <path d="M 0,-24 L 2,-18 L 8,-18 L 3,-14 L 5,-8 L 0,-12 L -5,-8 L -3,-14 L -8,-18 L -2,-18 Z" fill="#E5E8E8" opacity="0.8" />
        <text x="0" y="14" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="'Georgia', serif" textAnchor="middle" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.4))">
          S
        </text>
        <path d="M -15,18 L 15,18 L 10,23 L -10,23 Z" fill="#7F8C8D" />
      </g>

      {/* Glossy overlay */}
      <circle cx="50" cy="50" r="44" fill="url(#shineOverlay)" style={{ mixBlendMode: 'overlay' }} />
    </svg>
  )
}

// 3D Gold Bullion Bar
export function GoldBarIcon({ className = "w-12 h-12", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldBarTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="50%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
        <linearGradient id="goldBarFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#873600" />
        </linearGradient>
        <linearGradient id="goldBarSide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#5E2F0D" />
        </linearGradient>
        <filter id="barShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#000" floodOpacity="0.7" />
        </filter>
      </defs>

      <g filter="url(#barShadow)">
        {/* Isometric 3D Gold Bar */}
        {/* Top Face */}
        <polygon points="50,22 82,32 50,42 18,32" fill="url(#goldBarTop)" />

        {/* Side Face */}
        <polygon points="18,32 50,42 50,75 18,63" fill="url(#goldBarFront)" />

        {/* Front Face */}
        <polygon points="50,42 82,32 82,63 50,75" fill="url(#goldBarSide)" />

        {/* Embossed Purity details on top face */}
        <text x="50" y="31" fill="#7E5109" fontSize="6" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" transform="skewX(-18) rotate(4) scale(0.9)" opacity="0.8">
          999.9 FINE GOLD
        </text>
        <text x="50" y="37" fill="#7E5109" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" transform="skewX(-18) rotate(4) scale(0.9)" opacity="0.8">
          10g
        </text>
      </g>
    </svg>
  )
}

// 3D Silver Bullion Bar
export function SilverBarIcon({ className = "w-12 h-12", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverBarTopRef" x1="19" y1="46" x2="81" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#D5D8DC" />
          <stop offset="60%" stopColor="#F2F4F4" />
          <stop offset="90%" stopColor="#95A5A6" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="silverBarLeftRef" x1="19" y1="46" x2="46" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BDC3C7" />
          <stop offset="50%" stopColor="#7F8C8D" />
          <stop offset="100%" stopColor="#2C3E50" />
        </linearGradient>
        <linearGradient id="silverBarRightRef" x1="46" y1="62" x2="81" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5E8E8" />
          <stop offset="50%" stopColor="#BDC3C7" />
          <stop offset="100%" stopColor="#566573" />
        </linearGradient>
        <filter id="barShadowRef" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="4.5" floodColor="#000000" floodOpacity="0.75" />
        </filter>
      </defs>
      <g filter="url(#barShadowRef)">
        {/* Top Face */}
        <polygon points="54,20 81,36 46,62 19,46" fill="url(#silverBarTopRef)" />
        {/* Left Side Face */}
        <polygon points="19,46 46,62 46,80 19,64" fill="url(#silverBarLeftRef)" stroke="#7F8C8D" strokeWidth="0.3" />
        {/* Right Side Face */}
        <polygon points="46,62 81,36 81,54 46,80" fill="url(#silverBarRightRef)" stroke="#2C3E50" strokeWidth="0.3" />
        {/* Seams/Highlights */}
        <polyline points="19,46 46,62 81,36" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
        <line x1="46" y1="62" x2="46" y2="80" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.75" />

        {/* Embossed text along the bar angle */}
        <g transform="translate(48, 41) rotate(30) skewX(-32) scale(0.9)">
          <text x="0" y="-8" fill="#2C3E50" fontSize="4.8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" opacity="0.9">
            SILVERe5
          </text>
          <text x="0" y="0" fill="#2C3E50" fontSize="4.2" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" opacity="0.85">
            999
          </text>
          <text x="0" y="6" fill="#34495E" fontSize="3" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.2" textAnchor="middle" opacity="0.8">
            PURE SILVER
          </text>
        </g>
      </g>
    </svg>
  )
}

// Custom Dashboard "Buy Gold" Icon: 3D Gold Coin (Matching Row 1, Icon 2)
export function BuyGoldIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="buyGoldBase" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="30%" stopColor="#E2A626" />
          <stop offset="70%" stopColor="#875700" />
          <stop offset="95%" stopColor="#E2A626" />
          <stop offset="100%" stopColor="#FFF5BE" />
        </radialGradient>
        <linearGradient id="buyGoldTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#875700" />
        </linearGradient>
        <filter id="buyCoinShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>
      <g filter="url(#buyCoinShadow)">
        {/* Coin Outer Base */}
        <circle cx="50" cy="50" r="44" fill="url(#buyGoldBase)" />
        {/* Outer Rim Highlight */}
        <circle cx="50" cy="50" r="42.5" stroke="#FFEFA6" strokeWidth="0.6" opacity="0.7" fill="none" />
        {/* Inner Recessed Face */}
        <circle cx="50" cy="50" r="37" fill="url(#buyGoldBase)" stroke="#5B3A00" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="35" stroke="#FFECA6" strokeWidth="0.4" opacity="0.4" fill="none" />
        
        {/* Coin Text */}
        <text x="50" y="46" fill="url(#buyGoldTextGrad)" fontSize="9.5" fontWeight="bold" fontFamily="'Montserrat', sans-serif" letterSpacing="0.1" textAnchor="middle">
          GOLDe5
        </text>
        <text x="50" y="56" fill="#FFF2A3" fontSize="6" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" opacity="0.9">
          999
        </text>
        <text x="50" y="64" fill="#FFE28A" fontSize="4" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.4" textAnchor="middle" opacity="0.8">
          PURE GOLD
        </text>
        {/* Inner rim dots */}
        <circle cx="50" cy="50" r="39" stroke="#FFECA6" strokeWidth="0.4" strokeDasharray="1 2" fill="none" opacity="0.4" />
      </g>
    </svg>
  )
}

// Custom Dashboard "Start SIP" Icon: 3D Gold SIP Loop (Matching Row 2, Icon 3)
export function StartSipIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldSipGradRef" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9D2" />
          <stop offset="35%" stopColor="#E2A626" />
          <stop offset="70%" stopColor="#875700" />
          <stop offset="100%" stopColor="#4A2E00" />
        </linearGradient>
        <filter id="sipGlowRef" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>
      <g filter="url(#sipGlowRef)" transform="translate(50,50) scale(0.95)">
        {/* Arrow circle */}
        <path d="M -15,-20 A 25,25 0 1,0 20,12" stroke="url(#goldSipGradRef)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M 12,-15 A 25,25 0 0,0 -8,-24" stroke="url(#goldSipGradRef)" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Center arrow coming out up-right */}
        <path d="M -15,15 L 25,-25" stroke="url(#goldSipGradRef)" strokeWidth="7.5" strokeLinecap="round" fill="none" />
        <path d="M 11,-25 L 25,-25 L 25,-11" stroke="url(#goldSipGradRef)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Center text */}
        <text x="0.5" y="6" fill="url(#goldSipGradRef)" fontSize="14.5" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">
          SIP
        </text>
      </g>
    </svg>
  )
}

// Custom Dashboard "Sell Gold" Icon: Gold Coin with Arrow (Matching Row 2, Icon 4)
export function SellGoldIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sellGoldBaseGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="30%" stopColor="#E2A626" />
          <stop offset="70%" stopColor="#875700" />
          <stop offset="95%" stopColor="#E2A626" />
          <stop offset="100%" stopColor="#FFF5BE" />
        </radialGradient>
        <linearGradient id="sellGoldArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9D2" />
          <stop offset="35%" stopColor="#E2A626" />
          <stop offset="70%" stopColor="#875700" />
          <stop offset="100%" stopColor="#4A2E00" />
        </linearGradient>
        <filter id="sellGlowRef" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>
      <g filter="url(#sellGlowRef)" transform="translate(48, 52) scale(0.92)">
        {/* Coin Base */}
        <circle cx="0" cy="0" r="32" fill="url(#sellGoldBaseGrad)" />
        <circle cx="0" cy="0" r="30.5" stroke="#FFEFA6" strokeWidth="0.6" opacity="0.6" fill="none" />
        <circle cx="0" cy="0" r="26" fill="url(#sellGoldBaseGrad)" stroke="#5B3A00" strokeWidth="0.4" />
        <text x="0" y="3" fill="url(#buyGoldTextGrad)" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          GOLDe5
        </text>
        <circle cx="0" cy="0" r="28" stroke="#FFECA6" strokeWidth="0.4" strokeDasharray="1 2" fill="none" opacity="0.4" />
        
        {/* Arrow pointing up-right bursting out */}
        <g transform="translate(14, -14)">
          <path d="M -22,22 L 6,-6" stroke="url(#sellGoldArrowGrad)" strokeWidth="7" strokeLinecap="round" />
          <path d="M -4,-6 L 6,-6 L 6,4" stroke="url(#sellGoldArrowGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>
    </svg>
  )
}

// Custom Dashboard "Refer" Icon: Reward Badge (Matching Row 2, Icon 5)
export function ReferIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldReferBase" cx="50%" cy="56%" r="32%" fx="40%" fy="46%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="50%" stopColor="#E2A626" />
          <stop offset="85%" stopColor="#875700" />
          <stop offset="100%" stopColor="#5E3F05" />
        </radialGradient>
        <linearGradient id="goldRibbonGrad" x1="30" y1="12" x2="70" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9D2" />
          <stop offset="50%" stopColor="#E2A626" />
          <stop offset="100%" stopColor="#5E3F05" />
        </linearGradient>
        <filter id="referGlowRef" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>
      <g filter="url(#referGlowRef)">
        {/* Ribbon Loops & Tails */}
        {/* Left Loop */}
        <path d="M 50,24 C 42,12 28,15 36,26 C 41,31 46,26 50,24 Z" fill="url(#goldRibbonGrad)" stroke="#5B3A00" strokeWidth="0.5" />
        {/* Right Loop */}
        <path d="M 50,24 C 58,12 72,15 64,26 C 59,31 54,26 50,24 Z" fill="url(#goldRibbonGrad)" stroke="#5B3A00" strokeWidth="0.5" />
        {/* Left Tail */}
        <path d="M 45,25 L 34,42 L 41,40 L 48,25 Z" fill="url(#goldRibbonGrad)" stroke="#5B3A00" strokeWidth="0.4" />
        {/* Right Tail */}
        <path d="M 55,25 L 66,42 L 59,40 L 52,25 Z" fill="url(#goldRibbonGrad)" stroke="#5B3A00" strokeWidth="0.4" />
        {/* Center Knot */}
        <circle cx="50" cy="24" r="4.5" fill="url(#goldRibbonGrad)" stroke="#5B3A00" strokeWidth="0.5" />

        {/* Medal Round Base */}
        <circle cx="50" cy="56" r="30" fill="url(#goldReferBase)" />
        <circle cx="50" cy="56" r="28.5" stroke="#FFEFA6" strokeWidth="0.6" opacity="0.6" fill="none" />
        <circle cx="50" cy="56" r="25" fill="url(#goldReferBase)" stroke="#5B3A00" strokeWidth="0.5" />
        
        {/* Text */}
        <text x="50" y="54" fill="url(#buyGoldTextGrad)" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          GOLDe5
        </text>
        <text x="50" y="64" fill="#FFF2A3" fontSize="5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.4" textAnchor="middle" opacity="0.9">
          REWARD
        </text>
        
        {/* Inner rim dots */}
        <circle cx="50" cy="56" r="26.8" stroke="#FFECA6" strokeWidth="0.4" strokeDasharray="1 2" fill="none" opacity="0.5" />
      </g>
    </svg>
  )
}

// WhatsApp Gold Icon
export function GoldWhatsAppIcon({ className = "w-5 h-5", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldSocial" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#855B0B" />
        </linearGradient>
      </defs>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.5 21.5l3.8-1.33C7.86 21.35 9.87 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3.8 13.05c-.21.58-1.21 1.13-1.68 1.18-.47.05-.9-.16-2.95-1.02-2.63-1.1-4.32-3.8-4.45-3.97-.13-.17-1.08-1.44-1.08-2.75 0-1.31.68-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36.01.52.01.17 0 .4.01.61.52.21.52.72 1.76.78 1.88.06.12.1.27.02.44-.08.17-.18.28-.35.49-.17.21-.37.47-.53.63-.18.18-.37.38-.16.74.21.36.93 1.53 2.01 2.49 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.79-.1.22-.25.93-1.08 1.18-1.45.25-.37.5-.31.84-.18.35.13 2.21 1.04 2.59 1.23.38.19.63.29.72.44.09.15.09.87-.12 1.45z" fill="url(#goldSocial)" />
    </svg>
  )
}

// Instagram Gold Icon
export function GoldInstagramIcon({ className = "w-5 h-5", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#goldSocial)" />
    </svg>
  )
}

// Twitter/X Gold Icon
export function GoldTwitterIcon({ className = "w-5 h-5", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="url(#goldSocial)" />
    </svg>
  )
}

// YouTube Gold Icon
export function GoldYoutubeIcon({ className = "w-5 h-5", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="url(#goldSocial)" />
    </svg>
  )
}

// Logout Gold/Crimson Icon
export function GoldLogoutIcon({ className = "w-5 h-5", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldRedLogout" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7675" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C0392B" />
        </linearGradient>
      </defs>
      <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" fill="url(#goldRedLogout)" />
    </svg>
  )
}
