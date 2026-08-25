import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Float, Line } from '@react-three/drei'
import * as THREE from 'three'

// Pure deterministic pseudo-random helper to satisfy react-hooks/purity
function getPseudoRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function GlobeWireframe() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08
  })

  // Generate latitude/longitude lines
  const lines = useMemo(() => {
    const result = []
    const radius = 1.6

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const points = []
      const phi = (90 - lat) * (Math.PI / 180)
      for (let lon = 0; lon <= 360; lon += 5) {
        const theta = lon * (Math.PI / 180)
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        )
      }
      result.push(points)
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const points = []
      const theta = lon * (Math.PI / 180)
      for (let lat = -90; lat <= 90; lat += 5) {
        const phi = (90 - lat) * (Math.PI / 180)
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        )
      }
      result.push(points)
    }

    return result
  }, [])

  // Data connection points
  const connectionPoints = useMemo(() => {
    const points = []
    for (let i = 0; i < 12; i++) {
      const phi = Math.acos(2 * getPseudoRandom(i * 4 + 1) - 1)
      const theta = getPseudoRandom(i * 4 + 2) * Math.PI * 2
      const r = 1.6
      points.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ],
        size: 0.03 + getPseudoRandom(i * 4 + 3) * 0.02,
        speed: 2 + getPseudoRandom(i * 4 + 4) * 2,
      })
    }
    return points
  }, [])

  return (
    <group ref={groupRef}>
      {/* Wireframe lines */}
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#00E5FF"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Core sphere */}
      <Sphere args={[1.55, 32, 32]}>
        <meshStandardMaterial
          color="#050505"
          transparent
          opacity={0.4}
          roughness={0.8}
        />
      </Sphere>

      {/* Data nodes */}
      {connectionPoints.map((point, i) => (
        <Float key={i} speed={point.speed} floatIntensity={0.3}>
          <Sphere args={[point.size, 8, 8]} position={point.position}>
            <meshStandardMaterial
              color={i % 3 === 0 ? '#8A2BE2' : '#00E5FF'}
              emissive={i % 3 === 0 ? '#8A2BE2' : '#00E5FF'}
              emissiveIntensity={3}
            />
          </Sphere>
        </Float>
      ))}

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 1.95, 64]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export function DigitalGlobe() {
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <GlobeWireframe />
    </Float>
  )
}

export default DigitalGlobe
