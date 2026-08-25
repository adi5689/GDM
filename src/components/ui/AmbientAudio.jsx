import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const oscillatorsRef = useRef([])

  const createAmbientSound = useCallback(() => {
    if (audioContextRef.current) return

    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioContextRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)
    gainNodeRef.current = masterGain

    // Create layered ambient drones
    const frequencies = [55, 82.5, 110, 165, 220]
    const types = ['sine', 'sine', 'sine', 'triangle', 'sine']

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()
      osc.type = types[i]
      osc.frequency.value = freq
      oscGain.gain.value = 0.03 / (i + 1)

      // Add subtle frequency modulation
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.05 + Math.random() * 0.1
      lfoGain.gain.value = freq * 0.002
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      lfo.start()

      osc.connect(oscGain)
      oscGain.connect(masterGain)
      osc.start()

      oscillatorsRef.current.push(osc, lfo)
    })

    // Subtle filtered noise layer
    const bufferSize = ctx.sampleRate * 2
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.3
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 200
    filter.Q.value = 1

    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.008

    noiseSource.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(masterGain)
    noiseSource.start()

    oscillatorsRef.current.push(noiseSource)
  }, [])

  const toggleAudio = useCallback(() => {
    if (!isPlaying) {
      createAmbientSound()
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
      // Fade in
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioContextRef.current.currentTime)
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.6,
          audioContextRef.current.currentTime + 2
        )
      }
      setIsPlaying(true)
    } else {
      // Fade out
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioContextRef.current.currentTime)
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 1
        )
      }
      setIsPlaying(false)
    }
  }, [isPlaying, createAmbientSound])

  // Persist preference
  useEffect(() => {
    const saved = localStorage.getItem('grafiqly-audio')
    if (saved === 'true') {
      // Don't auto-play, just note the preference
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('grafiqly-audio', String(isPlaying))
  }, [isPlaying])

  // Cleanup
  useEffect(() => {
    const oscillators = oscillatorsRef.current
    const audioCtx = audioContextRef.current
    return () => {
      oscillators.forEach(osc => {
        try { osc.stop() } catch { /* ignore */ }
      })
      if (audioCtx) {
        audioCtx.close()
      }
    }
  }, [])

  return (
    <motion.button
      onClick={toggleAudio}
      className="fixed bottom-6 right-24 z-50 w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-subtext flex items-center justify-center hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Mute ambient audio' : 'Play ambient audio'}
      title={isPlaying ? 'Mute ambient audio' : 'Play ambient audio'}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
      {/* Playing indicator */}
      {isPlaying && (
        <motion.span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}
