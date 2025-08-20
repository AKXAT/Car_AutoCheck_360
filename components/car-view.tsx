"use client"

import { useState } from "react"

interface CarViewProps {
  onPartClick: (partId: string) => void
  highlightedPart: string | null
}

export default function CarView({ onPartClick, highlightedPart }: CarViewProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  const getPartColor = (partId: string) => {
    if (highlightedPart === partId || hoveredPart === partId) {
      return "#ef4444" // Red accent color
    }
    return "#6b7280" // Default gray
  }

  const getPartOpacity = (partId: string) => {
    if (highlightedPart === partId || hoveredPart === partId) {
      return 0.9
    }
    return 0.6
  }

  const getPartClass = (partId: string) => {
    let baseClass = "cursor-pointer transition-all duration-300 hover:drop-shadow-lg"
    if (highlightedPart === partId) {
      baseClass += " animate-pulse"
    }
    return baseClass
  }

  const partLabels = {
    body: "Vehicle Body",
    front: "Front Systems",
    battery: "Battery Pack",
    motor: "Electric Motor",
    wheels: "Wheel Systems",
    autopilot: "Autopilot Sensors",
    infotainment: "Infotainment System",
  }

  return (
    <div className="w-full max-w-2xl">
      <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(107, 114, 128, 0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Car Body */}
        <rect
          x="150"
          y="150"
          width="500"
          height="100"
          rx="20"
          fill={getPartColor("body")}
          opacity={getPartOpacity("body")}
          className={getPartClass("body")}
          onMouseEnter={() => setHoveredPart("body")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("body")}
        />

        {/* Front Section */}
        <rect
          x="100"
          y="170"
          width="60"
          height="60"
          rx="10"
          fill={getPartColor("front")}
          opacity={getPartOpacity("front")}
          className={getPartClass("front")}
          onMouseEnter={() => setHoveredPart("front")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("front")}
        />

        {/* Battery Pack */}
        <rect
          x="200"
          y="260"
          width="400"
          height="40"
          rx="5"
          fill={getPartColor("battery")}
          opacity={getPartOpacity("battery")}
          className={getPartClass("battery")}
          onMouseEnter={() => setHoveredPart("battery")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("battery")}
        />

        {/* Motor */}
        <circle
          cx="500"
          cy="280"
          r="25"
          fill={getPartColor("motor")}
          opacity={getPartOpacity("motor")}
          className={getPartClass("motor")}
          onMouseEnter={() => setHoveredPart("motor")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("motor")}
        />

        {/* Wheels */}
        <circle
          cx="200"
          cy="320"
          r="30"
          fill={getPartColor("wheels")}
          opacity={getPartOpacity("wheels")}
          className={getPartClass("wheels")}
          onMouseEnter={() => setHoveredPart("wheels")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("wheels")}
        />
        <circle
          cx="600"
          cy="320"
          r="30"
          fill={getPartColor("wheels")}
          opacity={getPartOpacity("wheels")}
          className={getPartClass("wheels")}
          onMouseEnter={() => setHoveredPart("wheels")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("wheels")}
        />

        {/* Autopilot Sensors */}
        <rect
          x="120"
          y="180"
          width="20"
          height="10"
          rx="2"
          fill={getPartColor("autopilot")}
          opacity={getPartOpacity("autopilot")}
          className={getPartClass("autopilot")}
          onMouseEnter={() => setHoveredPart("autopilot")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("autopilot")}
        />

        {/* Infotainment */}
        <rect
          x="350"
          y="160"
          width="100"
          height="60"
          rx="5"
          fill={getPartColor("infotainment")}
          opacity={getPartOpacity("infotainment")}
          className={getPartClass("infotainment")}
          onMouseEnter={() => setHoveredPart("infotainment")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => onPartClick("infotainment")}
        />

        {/* Labels */}
        <text x="400" y="140" textAnchor="middle" className="fill-foreground text-sm font-medium">
          Tesla Model S
        </text>

        {hoveredPart && (
          <g>
            <rect
              x="300"
              y="365"
              width="200"
              height="25"
              rx="12"
              fill="rgba(0, 0, 0, 0.8)"
              className="animate-in fade-in duration-200"
            />
            <text x="400" y="380" textAnchor="middle" className="fill-accent text-sm font-medium">
              {partLabels[hoveredPart as keyof typeof partLabels]}
            </text>
          </g>
        )}
      </svg>

      <div className="mt-6 text-center">
        <div className="text-sm text-muted-foreground mb-2">
          Click on any highlighted component to view detailed test results
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Good</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>
    </div>
  )
}
