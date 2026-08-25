import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'

const planetPositions = [
  { pos: [0, 0, 0], size: 0.6, color: '#00E5FF' },
  { pos: [2.5, 1, -1], size: 0.4, color: '#8A2BE2' },
  { pos: [-2.2, -0.8, 0.5], size: 0.45, color: '#00E5FF' },
  { pos: [1.5, -1.5, 1], size: 0.35, color: '#8A2BE2' },
  { pos: [-1.8, 1.2, -0.8], size: 0.38, color: '#00E5FF' },
  { pos: [0.5, 2, 0.5], size: 0.32, color: '#8A2BE2' },
  { pos: [-0.8, -2, -0.5], size: 0.42, color: '#00E5FF' },
]

function Planet({ position, size, color, index, onSelect }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * (0.2 + index * 0.05)
  })

  return (
    <Float
      speed={1 + index * 0.3}
      rotationIntensity={0.4}
      floatIntensity={0.8 + index * 0.1}
    >
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[size, 32, 32]}
          onPointerOver={() => {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'default'
          }}
          onClick={() => onSelect && onSelect(index)}
        >
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={hovered ? 0.5 : 0.2}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.15}
          />
        </Sphere>

        {/* Orbit ring */}
        <mesh rotation={[Math.PI / 2 + index * 0.2, 0, 0]}>
          <ringGeometry args={[size + 0.15, size + 0.18, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={hovered ? 0.6 : 0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function ServicePlanets({ services = [], onSelect }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
  })

  const handleSelect = (index) => {
    if (services[index] && onSelect) {
      onSelect(services[index])
    }
  }

  return (
    <group ref={groupRef}>
      {planetPositions.map((planet, i) => (
        <Planet
          key={i}
          position={planet.pos}
          size={planet.size}
          color={planet.color}
          index={i}
          onSelect={handleSelect}
        />
      ))}
    </group>
  )
}

export default ServicePlanets
