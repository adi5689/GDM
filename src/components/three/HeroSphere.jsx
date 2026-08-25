import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Float,
  Sphere,
  MeshDistortMaterial,
  Torus,
} from '@react-three/drei'

// Pure deterministic pseudo-random helper to satisfy react-hooks/purity
function getPseudoRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function GlowingSphere() {
  const meshRef = useRef()

  useFrame(({ mouse, clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
    meshRef.current.rotation.x = mouse.y * 0.3
    meshRef.current.rotation.z = mouse.x * 0.2
  })

  // Precompute particle coordinates and speeds to comply with purity rules
  const particles = useMemo(() => {
    const list = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 1.8 + getPseudoRandom(i * 5 + 1) * 0.6
      list.push({
        radius,
        speed: 1 + getPseudoRandom(i * 5 + 2),
        floatIntensity: 1 + getPseudoRandom(i * 5 + 3),
        size: 0.04 + getPseudoRandom(i * 5 + 4) * 0.03,
        position: [
          Math.cos(angle) * radius,
          (getPseudoRandom(i * 5 + 5) - 0.5) * 1.5,
          Math.sin(angle) * radius,
        ],
      })
    }
    return list
  }, [])

  return (
    <group ref={meshRef}>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2.5}>
        <Sphere args={[1.4, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00E5FF"
            speed={2.5}
            distort={0.3}
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Orbiting ring 1 */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Torus
          args={[2.0, 0.04, 16, 64]}
          rotation={[1.2, 0.3, 0]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#8A2BE2"
            emissive="#00E5FF"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </Torus>
      </Float>

      {/* Orbiting ring 2 */}
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <Torus
          args={[2.4, 0.025, 16, 64]}
          rotation={[0.6, -0.5, 0.8]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#8A2BE2"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>

      {/* Particle-like small spheres */}
      {particles.map((p, i) => (
        <Float
          key={i}
          speed={p.speed}
          rotationIntensity={0.5}
          floatIntensity={p.floatIntensity}
        >
          <Sphere args={[p.size, 8, 8]} position={p.position}>
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00E5FF' : '#8A2BE2'}
              emissive={i % 2 === 0 ? '#00E5FF' : '#8A2BE2'}
              emissiveIntensity={2}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export function HeroSphere() {
  return <GlowingSphere />
}

export default HeroSphere
