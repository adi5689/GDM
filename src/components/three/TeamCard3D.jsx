import { useRef, useState, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import * as THREE from 'three'

/* ────────────────────────────────────────────
   Glowing Border Wireframe
   ──────────────────────────────────────────── */
function GlowingBorder({ width, height, color, intensity }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.material.opacity = 0.3 + 0.2 * Math.sin(t * 2) * intensity
    }
  })

  // Create border shape as line segments
  const hw = width / 2
  const hh = height / 2
  const r = 0.08 // corner radius approximation

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-hw + r, -hh)
    s.lineTo(hw - r, -hh)
    s.quadraticCurveTo(hw, -hh, hw, -hh + r)
    s.lineTo(hw, hh - r)
    s.quadraticCurveTo(hw, hh, hw - r, hh)
    s.lineTo(-hw + r, hh)
    s.quadraticCurveTo(-hw, hh, -hw, hh - r)
    s.lineTo(-hw, -hh + r)
    s.quadraticCurveTo(-hw, -hh, -hw + r, -hh)
    return s
  }, [hw, hh, r])

  const points = useMemo(() => shape.getPoints(40), [shape])

  return (
    <group position={[0, 0, 0.01]}>
      {/* Inner line */}
      <line ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(points.flatMap(p => [p.x, p.y, 0]))}
            count={points.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </line>
      {/* Outer glow (slightly larger, more transparent) */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[width + 0.06, height + 0.06]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04 * intensity}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

/* ────────────────────────────────────────────
   Main TeamCard3D Component
   ──────────────────────────────────────────── */
function TeamCard3DInner({
  name = 'Team Member',
  role = 'Creative Director',
  image,
  color = '#00E5FF',
  position = [0, 0, 0],
}) {
  const groupRef = useRef()
  const cardRef = useRef()
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)

  // Tilt interaction on hover
  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    if (hovered) {
      // Tilt toward cursor
      const tiltX = pointer.y * 0.15
      const tiltY = -pointer.x * 0.15
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        tiltX,
        0.08
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        tiltY,
        0.08
      )
    } else {
      // Gentle idle sway
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.sin(t * 0.5) * 0.03,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.cos(t * 0.4) * 0.03,
        0.05
      )
    }

    // Hover scale
    const targetScale = hovered ? 1.06 : 1
    const s = groupRef.current.scale.x
    const newS = THREE.MathUtils.lerp(s, targetScale, 0.08)
    groupRef.current.scale.setScalar(newS)
  })

  // Gradient for avatar — use two contrasting stops from the member's color
  const avatarGradient = useMemo(() => {
    const c = new THREE.Color(color)
    const hsl = {}
    c.getHSL(hsl)
    const c2 = new THREE.Color().setHSL((hsl.h + 0.15) % 1, hsl.s, hsl.l)
    return `linear-gradient(135deg, ${color} 0%, #${c2.getHexString()} 100%)`
  }, [color])

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Card background plane — glassmorphism-like */}
        <mesh
          ref={cardRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[2, 2.6]} />
          <meshPhysicalMaterial
            color="#0D0D0D"
            transparent
            opacity={0.5}
            roughness={0.6}
            metalness={0.1}
            transmission={0.15}
            thickness={0.5}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Glowing border */}
        <GlowingBorder
          width={2}
          height={2.6}
          color={color}
          intensity={hovered ? 2.5 : 0.8}
        />

        {/* HTML overlay content */}
        <Html
          center
          transform
          distanceFactor={4.5}
          style={{ pointerEvents: 'none' }}
          position={[0, 0, 0.02]}
        >
          <div className="w-[180px] flex flex-col items-center text-center select-none py-4">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg"
              style={{
                background: avatarGradient,
                boxShadow: hovered ? `0 0 25px ${color}40` : 'none',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-xl font-display font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>

            {/* Name */}
            <h4 className="text-white text-sm font-display font-semibold tracking-wide">
              {name}
            </h4>

            {/* Role */}
            <p
              className="text-[10px] font-medium mt-1 tracking-wider uppercase"
              style={{ color }}
            >
              {role}
            </p>

            {/* Decorative line */}
            <div
              className="w-8 h-[1px] mt-3 rounded-full transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                width: hovered ? '48px' : '32px',
                opacity: hovered ? 1 : 0.5,
              }}
            />
          </div>
        </Html>
      </group>
    </group>
  )
}

export const TeamCard3D = memo(TeamCard3DInner)
