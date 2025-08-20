"use client"

import { ChevronRight, ChevronDown, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TreeNode {
  [key: string]: any
}

interface TreeViewProps {
  data: TreeNode
  onSelect: (partId: string) => void
  selectedPart: string | null
}

interface TreeItemProps {
  name: string
  data: any
  level: number
  onSelect: (partId: string) => void
  selectedPart: string | null
}

function TreeItem({ name, data, level, onSelect, selectedPart }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = typeof data === "object" && !data.testsRun
  const isLeaf = data.testsRun !== undefined

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Good":
        return "text-green-500"
      case "Warning":
        return "text-yellow-500"
      case "Critical":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "Good":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "Warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />
      case "Critical":
        return <XCircle className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  const handleClick = () => {
    if (isLeaf) {
      onSelect(name.toLowerCase().replace(/\s+/g, "-"))
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className={`w-full justify-start h-auto p-2 transition-all duration-200 hover:bg-accent/10 ${
          selectedPart === name.toLowerCase().replace(/\s+/g, "-") ? "bg-accent/20 border-l-2 border-accent" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 w-full">
          {hasChildren && (
            <div className="transition-transform duration-200">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          )}
          {!hasChildren && <div className="w-4" />}

          <span className="flex-1 text-left text-sm">{name}</span>

          {isLeaf && (
            <div className="flex items-center gap-2">
              {getHealthIcon(data.health)}
              <span className={`text-xs font-medium ${getHealthColor(data.health)}`}>{data.health}</span>
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {data.passed}/{data.testsRun}
              </span>
            </div>
          )}
        </div>
      </Button>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {Object.entries(data).map(([key, value]) => (
            <TreeItem
              key={key}
              name={key}
              data={value}
              level={level + 1}
              onSelect={onSelect}
              selectedPart={selectedPart}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TreeView({ data, onSelect, selectedPart }: TreeViewProps) {
  return (
    <div className="space-y-1">
      {Object.entries(data).map(([key, value]) => (
        <TreeItem key={key} name={key} data={value} level={0} onSelect={onSelect} selectedPart={selectedPart} />
      ))}
    </div>
  )
}
