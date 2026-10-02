import { useState } from 'react'
import { company } from '../data/site'

// Google Map with a shimmer placeholder until the iframe has loaded.
export default function MapEmbed({ src = company.offices[0]?.map, title = `${company.name} office location`, style }) {
  const [loaded, setLoaded] = useState(false)
  if (!src) return null
  return (
    <div className={`map-box${loaded ? ' loaded' : ''}`} style={style}>
      <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" onLoad={() => setLoaded(true)} />
    </div>
  )
}
