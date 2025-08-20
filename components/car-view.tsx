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
    battery: { name: "Battery Pack (75kWh)", health: 98, status: "optimal", position: [0, -0.3, 0] },
    motor: { name: "Dual Motor AWD", health: 95, status: "optimal", position: [0, -0.2, -1.8] },
    autopilot: { name: "Autopilot System", health: 92, status: "good", position: [0, 0.4, 2.2] },
    infotainment: { name: '15.4" Touchscreen', health: 88, status: "warning", position: [0, 0.3, 0.8] },
    doors: { name: "Door Systems", health: 100, status: "optimal", position: [-1.8, 0.2, 0] },
    roof: { name: "Glass Panoramic Roof", health: 96, status: "optimal", position: [0, 0.8, 0] },
    charging: { name: "Charging Port", health: 94, status: "optimal", position: [1.8, 0.1, -1.2] },
    wheels: { name: '18" Aero Wheels', health: 85, status: "good", position: [1.6, -0.5, 1.5] },
    front: { name: "Front Sensors", health: 90, status: "good", position: [0, 0.1, 2.4] },
    rear: { name: "Rear Camera", health: 93, status: "optimal", position: [0, 0.6, -2.4] },
    frunk: { name: "Front Trunk", health: 100, status: "optimal", position: [0, 0.3, 1.8] },
    body: { name: "Vehicle Structure", health: 97, status: "optimal", position: [0, 0.2, 0] },
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
      {/* Main car body - lower profile sedan shape */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 1.0, 4.6]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} clearcoatRoughness={0.05} />
      </mesh>

      {/* Roof - connected to main body, proper Tesla Model 3 profile */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[3.4, 0.3, 4.2]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>

      {/* Glass roof panel - Tesla signature panoramic roof */}
      <mesh position={[0, 0.61, -0.5]} castShadow>
        <boxGeometry args={[3.2, 0.02, 2.5]} />
        <meshPhysicalMaterial
          color="#87ceeb"
          metalness={0.1}
          roughness={0.02}
          transmission={0.9}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Hood - properly connected to main body */}
      <mesh position={[0, 0.05, 1.8]} rotation={[0.05, 0, 0]} castShadow>
        <boxGeometry args={[3.4, 0.2, 1.4]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>

      {/* Trunk - connected rear section */}
      <mesh position={[0, 0.05, -2.0]} rotation={[-0.03, 0, 0]} castShadow>
        <boxGeometry args={[3.4, 0.4, 1.2]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Windshield - properly angled and connected */}
      <mesh position={[0, 0.5, 1.2]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.02, 1.2]} />
        <meshPhysicalMaterial
          color="#87ceeb"
          metalness={0.1}
          roughness={0.01}
          transmission={0.95}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {/* Rear windshield - connected to roof */}
      <mesh position={[0, 0.5, -1.4]} rotation={[-0.15, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.02, 1.0]} />
        <meshPhysicalMaterial
          color="#87ceeb"
          metalness={0.1}
          roughness={0.01}
          transmission={0.95}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {/* Side windows - connected to roof structure */}
      <mesh position={[-1.7, 0.4, 0.2]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.02, 0.6, 2.5]} />
        <meshPhysicalMaterial
          color="#87ceeb"
          metalness={0.1}
          roughness={0.01}
          transmission={0.95}
          transparent={true}
          opacity={0.2}
        />
      </mesh>
      <mesh position={[1.7, 0.4, 0.2]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.02, 0.6, 2.5]} />
        <meshPhysicalMaterial
          color="#87ceeb"
          metalness={0.1}
          roughness={0.01}
          transmission={0.95}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {/* Front bumper - integrated with body */}
      <mesh position={[0, -0.25, 2.4]} castShadow>
        <boxGeometry args={[3.2, 0.3, 0.4]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rear bumper - integrated design */}
      <mesh position={[0, -0.25, -2.4]} castShadow>
        <boxGeometry args={[3.2, 0.3, 0.4]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Door frames - connected to main structure */}
      <mesh position={[-1.8, 0.2, 0.5]} castShadow>
        <boxGeometry args={[0.1, 0.8, 1.8]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.8, 0.2, 0.5]} castShadow>
        <boxGeometry args={[0.1, 0.8, 1.8]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* A-pillars - structural connection between roof and body */}
      <mesh position={[-1.4, 0.4, 1.0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.4, 0.4, 1.0]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* B-pillars - rear structural support */}
      <mesh position={[-1.4, 0.4, -0.5]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.4, 0.4, -0.5]} rotation={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Headlights - integrated into front design */}
      <mesh position={[-1.2, 0.1, 2.25]} rotation={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.25, 0.15]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.2, 0.1, 2.25]} rotation={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.25, 0.15]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Taillights - Tesla signature design */}
      <mesh position={[-1.2, 0.2, -2.25]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.1]} />
        <meshPhysicalMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[1.2, 0.2, -2.25]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.1]} />
        <meshPhysicalMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.4} />
      </mesh>

      {/* Side mirrors - properly positioned */}
      <mesh position={[-1.9, 0.5, 0.8]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.2]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.9, 0.5, 0.8]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.2]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Door handles - Tesla flush design */}
      <mesh position={[-1.85, 0.15, 0.5]} castShadow>
        <boxGeometry args={[0.03, 0.06, 0.25]} />
        <meshPhysicalMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.85, 0.15, 0.5]} castShadow>
        <boxGeometry args={[0.03, 0.06, 0.25]} />
        <meshPhysicalMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wheels - realistic Tesla Aero design */}
      {[
        [-1.5, -0.4, 1.3],
        [1.5, -0.4, 1.3],
        [-1.5, -0.4, -1.3],
        [1.5, -0.4, -1.3],
      ].map((position, index) => (
        <group key={index} position={position as [number, number, number]}>
          {/* Tire */}
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 32]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.24, 32]} />
            <meshPhysicalMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Aero cover */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.01, 32]} />
            <meshPhysicalMaterial color="#f3f4f6" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Tesla center cap */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 16]} />
            <meshPhysicalMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Tesla front grille area */}
      <mesh position={[0, -0.05, 2.5]} castShadow>
        <boxGeometry args={[2.6, 0.4, 0.05]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Tesla logo area */}
      <mesh position={[0, 0.05, 2.55]} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.02]} />
        <meshPhysicalMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>

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
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={statusColor} transparent opacity={isHighlighted ? 1 : 0.7} />
            </mesh>

            <mesh scale={isHighlighted ? 2 : 1.2}>
              <ringGeometry args={[0.1, 0.12, 16]} />
              <meshBasicMaterial color={statusColor} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>

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
          <PerspectiveCamera makeDefault position={[6, 4, 6]} />

          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.6} />

          <Environment preset="studio" />

          <Suspense fallback={null}>
            <TeslaModel3 onPartClick={onPartClick} highlightedPart={highlightedPart} />
          </Suspense>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={4}
            maxDistance={12}
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
