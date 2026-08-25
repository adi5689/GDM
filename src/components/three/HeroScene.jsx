import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, OrbitControls, Torus, Environment } from '@react-three/drei'
import { useRef } from 'react'

function Geometries() {
  const group = useRef()
  useFrame(({ mouse }) => {
    if (!group.current) return
    group.current.rotation.y += 0.003
    group.current.rotation.x = mouse.y * 0.25
    group.current.rotation.z = mouse.x * 0.2
  })

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={2}>
        <Icosahedron args={[1.2, 1]} position={[0, 0.2, 0]}>
          <MeshDistortMaterial color="#00F5FF" speed={2} distort={0.25} roughness={0.1} metalness={0.8} />
        </Icosahedron>
      </Float>
      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.6}>
        <Torus args={[1.9, 0.08, 12, 32]} rotation={[1, 0, 0]} position={[0.2, 0, 0]}>
          <meshStandardMaterial color="#8b5cf6" emissive="#00F5FF" emissiveIntensity={0.4} />
        </Torus>
      </Float>
    </group>
  )
}

export function HeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={25} color="#00F5FF" />
      <pointLight position={[-2, -2, 2]} intensity={12} color="#7c3aed" />
      <Geometries />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      <Environment preset="city" />
    </Canvas>
  )
}
