export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Static ambient gradient orbs — no animation, no blur filter */}
      <div
        className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #00E5FF, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #8A2BE2, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[60%] left-[50%] w-[400px] h-[400px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #00E5FF, transparent 70%)',
        }}
      />
    </div>
  )
}
