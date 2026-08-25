import { Suspense, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei'

/**
 * SceneContainer — Reusable R3F Canvas wrapper
 * Provides consistent lighting, environment, and performance optimizations
 * for all 3D scenes across Grafiqly Digital Media 3.0.
 */

function LoadingFallback() {
  return (
    <div className="scene-loading absolute inset-0 w-full h-full rounded-xl" />
  )
}

function SceneContainerInner({
  children,
  className = '',
  style = {},
  cameraPosition = [0, 0, 5],
  cameraFov = 45,
  ambientIntensity = 0.4,
  showEnvironment = true,
  environmentPreset = 'city',
  enablePointLights = true,
  flat = false,
}) {
  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={style}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{
            position: cameraPosition,
            fov: cameraFov,
            near: 0.1,
            far: 100,
          }}
          flat={flat}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Lighting */}
          <ambientLight intensity={ambientIntensity} />
          {enablePointLights && (
            <>
              <pointLight
                position={[5, 5, 5]}
                intensity={20}
                color="#00E5FF"
                decay={2}
              />
              <pointLight
                position={[-4, -3, 3]}
                intensity={10}
                color="#8A2BE2"
                decay={2}
              />
              <pointLight
                position={[0, 4, -5]}
                intensity={8}
                color="#00E5FF"
                decay={2}
              />
            </>
          )}

          {/* Environment map for realistic reflections */}
          {showEnvironment && (
            <Environment preset={environmentPreset} />
          )}

          {/* Performance adaptive helpers */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          {/* Scene children */}
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

export const SceneContainer = memo(SceneContainerInner)
export default SceneContainer
