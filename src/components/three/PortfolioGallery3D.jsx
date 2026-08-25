import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, MeshDistortMaterial } from '@react-three/drei'

function ProjectFrame({ position, color, index, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.1
  })

  return (
    <Float
      speed={1.2 + index * 0.2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => {
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
        onClick={() => onClick && onClick(index)}
      >
        <RoundedBox
          args={[2, 1.4, 0.08]}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : 0.1}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </RoundedBox>

        {/* Border glow */}
        <RoundedBox
          args={[2.06, 1.46, 0.02]}
          radius={0.08}
          smoothness={4}
          position={[0, 0, -0.04]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.3}
            transparent
            opacity={hovered ? 0.6 : 0.2}
          />
        </RoundedBox>
      </group>
    </Float>
  )
}

const framePositions = [
  [-2.5, 1, 0],
  [0, 1.2, -1],
  [2.5, 0.8, 0.5],
  [-2, -1, 0.5],
  [0.5, -1.2, -0.5],
  [2.8, -0.8, -0.3],
]

const frameColors = [
  '#00E5FF',
  '#8A2BE2',
  '#FF6B35',
  '#E91E8C',
  '#10B981',
  '#14B8A6',
]

export function PortfolioGallery3D({ projects = [], onSelect }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.15
  })

  const handleClick = (index) => {
    if (projects[index] && onSelect) {
      onSelect(projects[index])
    }
  }

  return (
    <group ref={groupRef}>
      {framePositions.slice(0, projects.length || 6).map((pos, i) => (
        <ProjectFrame
          key={i}
          position={pos}
          color={projects[i]?.accentColor || frameColors[i]}
          index={i}
          onClick={handleClick}
        />
      ))}

      {/* Central decorative element */}
      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh position={[0, 0, -2]}>
          <icosahedronGeometry args={[0.5, 1]} />
          <MeshDistortMaterial
            color="#00E5FF"
            speed={1.5}
            distort={0.3}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default PortfolioGallery3D
