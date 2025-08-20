"use client"
import { useState, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Html } from "@react-three/drei"
import * as THREE from "three"

interface CarViewProps {
  onPartClick: (partId: string) => void
  highlightedPart: string | null
}

function TeslaModel3({
  onPartClick,
  highlightedPart,
}: { onPartClick: (partId: string) => void; highlightedPart: string | null }) {
  const meshRef = useRef<THREE.Group>(null)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  const carParts = {
    battery: { name: "Battery Pack (75kWh)", health: 98, status: "optimal", position: [0, -0.8, 0] },
    motor: { name: "Dual Motor AWD", health: 95, status: "optimal", position: [0, -0.5, -1.5] },
    autopilot: { name: "Autopilot System", health: 92, status: "good", position: [0, 0.2, 2] },
    infotainment: { name: '15.4" Touchscreen', health: 88, status: "warning", position: [0, 0.1, 0.5] },
    doors: { name: "Door Systems", health: 100, status: "optimal", position: [-1.2, 0, 0] },
    roof: { name: "Glass Panoramic Roof", health: 96, status: "optimal", position: [0, 1.2, 0] },
    charging: { name: "Charging Port", health: 94, status: "optimal", position: [1.5, 0, -0.5] },
    wheels: { name: '18" Aero Wheels', health: 85, status: "good", position: [1.2, -0.8, 1] },
    front: { name: "Front Sensors", health: 90, status: "good", position: [0, -0.2, 2.2] },
    rear: { name: "Rear Camera", health: 93, status: "optimal", position: [0, 0.5, -2.2] },
    frunk: { name: "Front Trunk", health: 100, status: "optimal", position: [0, 0.2, 1.8] },
    body: { name: "Vehicle Structure", health: 97, status: "optimal", position: [0, 0, 0] },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "#10b981"
      case "good":
        return "#3b82f6"
      case "warning":
        return "#f59e0b"
      case "error":
        return "#ef4444"
      default:
        return "#10b981"
    }
  }

  return (
    <group ref={meshRef}>
      {/* Main car body with premium materials */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.2, 2]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>

      {/* Car roof - glass panoramic */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[3.8, 0.1, 1.8]} />
        <meshPhysicalMaterial
          color="#87ceeb"
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Front section */}
      <mesh position={[0, -0.1, 1.2]} castShadow>
        <boxGeometry args={[3.5, 0.8, 0.6]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>

      {/* Rear section */}
      <mesh position={[0, -0.1, -1.2]} castShadow>
        <boxGeometry args={[3.5, 0.8, 0.6]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>

      {/* Wheels with premium materials */}
      {[
        [-1.4, -0.8, 1.2],
        [1.4, -0.8, 1.2],
        [-1.4, -0.8, -1.2],
        [1.4, -0.8, -1.2],
      ].map((position, index) => (
        <group key={index} position={position as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshPhysicalMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.22, 16]} />
            <meshPhysicalMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Interactive hotspots for each car part */}
      {Object.entries(carParts).map(([partId, part]) => {
        const isHighlighted = highlightedPart === partId || hoveredPart === partId
        const statusColor = getStatusColor(part.status)

        return (
          <group key={partId} position={part.position as [number, number, number]}>
            <mesh
              onPointerEnter={() => setHoveredPart(partId)}
              onPointerLeave={() => setHoveredPart(null)}
              onClick={() => onPartClick(partId)}
              scale={isHighlighted ? 1.5 : 1}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color={statusColor} transparent opacity={isHighlighted ? 1 : 0.7} />
            </mesh>

            {/* Pulsing ring effect */}
            <mesh scale={isHighlighted ? 2 : 1.2}>
              <ringGeometry args={[0.12, 0.15, 16]} />
              <meshBasicMaterial color={statusColor} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>

            {/* Tooltip */}
            {hoveredPart === partId && (
              <Html distanceFactor={10} position={[0, 0.3, 0]}>
                <div className="bg-black/95 text-white px-4 py-3 rounded-lg text-sm font-medium border border-red-500/50 min-w-48 pointer-events-none">
                  <div className="font-semibold">{part.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-xs text-gray-300">Health:</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${part.health}%`,
                          backgroundColor: statusColor,
                        }}
                      />
                    </div>
                    <div className="text-xs font-medium">{part.health}%</div>
                  </div>
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

export default function CarView({ onPartClick, highlightedPart }: CarViewProps) {
  return (
    <div className="w-full max-w-4xl">
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg overflow-hidden border border-gray-700">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} />

          {/* Premium lighting setup */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* HDR Environment for realistic reflections */}
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <TeslaModel3 onPartClick={onPartClick} highlightedPart={highlightedPart} />
          </Suspense>

          {/* Ground plane for shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>

        {/* Tesla branding overlay */}
        <div className="absolute top-4 left-4 text-white pointer-events-none">
          <div className="text-lg font-bold tracking-wider">TESLA</div>
          <div className="text-sm text-gray-300">Model 3 • 3D Diagnostic View</div>
        </div>

        <div className="absolute top-4 right-4 text-xs text-gray-400 text-right pointer-events-none">
          <div>Drag to rotate • Scroll to zoom</div>
          <div className="mt-1">Click hotspots for details</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground mb-3">
          Interactive Tesla Model 3 - Premium 3D Diagnostic Interface
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            <span>Optimal (95-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
            <span>Good (85-94%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
            <span>Warning (70-84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <span>Critical (&lt;70%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
