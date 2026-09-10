import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
export function AmbientAudio() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  useEffect(() => () => { audioRef.current?.close().catch(() => {}) }, [])
  const toggle = async () => {
    try {
      if (playing) { await audioRef.current.suspend(); setPlaying(false); return }
      if (!audioRef.current) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        audioRef.current = ctx
        const gain = ctx.createGain()
        gain.gain.value = 0.015
        gain.connect(ctx.destination)
        ;[55, 82.5, 110].forEach(frequency => { const oscillator = ctx.createOscillator(); oscillator.frequency.value = frequency; oscillator.connect(gain); oscillator.start() })
      }
      await audioRef.current.resume()
      setPlaying(true)
    } catch { setPlaying(false) }
  }
  return <button className="audio-button" onClick={toggle} aria-pressed={playing}>{playing ? <Volume2 size={16} /> : <VolumeX size={16} />} Ambient sound {playing ? 'on' : 'off'}</button>
}
