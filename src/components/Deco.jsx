// Subtle line-art background graphics (electrical theme).
// Drawn with currentColor so each placement controls colour/opacity via CSS.

function Circuit(props) {
  return (
    <svg viewBox="0 0 520 360" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M0 60h120l40 40h120l30-30h210" />
      <path d="M0 140h70l30 30h90l40-40h70l40 40h180" />
      <path d="M40 360V260l40-40h120l30 30v110" />
      <path d="M520 220H400l-40 40H250l-30-30h-80" />
      <path d="M300 0v70" />
      <path d="M440 0v40l-30 30" />
      <path d="M160 360v-60l30-30h90" />
      <path d="M470 360v-80l-30-30h-60" />
      {[
        [120, 60], [160, 100], [280, 100], [310, 70], [100, 170], [190, 170], [230, 130], [300, 130], [340, 170],
        [80, 220], [200, 220], [230, 250], [400, 220], [360, 260], [250, 260], [220, 230], [300, 70], [410, 70],
        [190, 270], [280, 270], [440, 250], [380, 250],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" fill="currentColor" stroke="none" />
      ))}
      <rect x="250" y="20" width="44" height="28" rx="4" />
      <rect x="40" y="290" width="36" height="36" rx="4" />
      <rect x="430" y="150" width="50" height="30" rx="4" />
    </svg>
  )
}

function Tower(props) {
  return (
    <svg viewBox="0 0 300 420" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" {...props}>
      <path d="M150 10 105 410M150 10l45 400" />
      <path d="M40 80h220M60 140h180M128 80l-88 0 30 22M172 80h88l-30 22M80 140l-20 0 22 18M220 140h20l-22 18" />
      <path d="M137 80l26 60M163 80l-26 60M130 140l40 70M170 140l-40 70M123 210l54 70M177 210l-54 70M116 280l68 70M184 280l-68 70M110 350l80 60M190 350l-80 60" />
      <path d="M123 210h54M116 280h68M110 350h80" />
      <path d="M40 80v18M260 80v18M60 140v18M240 140v18" />
      <path d="M0 118Q20 110 40 98M260 98Q280 108 300 118M0 176Q30 170 60 158M240 158Q270 170 300 176" strokeDasharray="3 5" />
    </svg>
  )
}

function Rings(props) {
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" {...props}>
      <circle cx="200" cy="200" r="190" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="150" strokeWidth="1.2" strokeDasharray="2 8" strokeLinecap="round" />
      <circle cx="200" cy="200" r="110" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="70" strokeWidth="1.2" strokeDasharray="14 10" />
      <circle cx="200" cy="10" r="6" fill="currentColor" stroke="none" />
      <circle cx="350" cy="200" r="5" fill="currentColor" stroke="none" />
      <circle cx="90" cy="200" r="4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Bolt(props) {
  return (
    <svg viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...props}>
      <path d="M72 4 12 112h42l-10 84 64-118H64L72 4Z" />
    </svg>
  )
}

function Wave(props) {
  return (
    <svg viewBox="0 0 600 120" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M0 60c25-50 50-50 75 0s50 50 75 0 50-50 75 0 50 50 75 0 50-50 75 0 50 50 75 0 50-50 75 0 50 50 75 0" />
      <path d="M0 60h600" strokeDasharray="2 8" strokeLinecap="round" />
    </svg>
  )
}

const shapes = { circuit: Circuit, tower: Tower, rings: Rings, bolt: Bolt, wave: Wave }

export default function Deco({ type, className = '', style }) {
  const S = shapes[type]
  return <S className={`deco deco-${type} ${className}`} style={style} aria-hidden="true" focusable="false" />
}
