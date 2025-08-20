"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react"

interface TestModalProps {
  partId: string
  data: any
  onClose: () => void
}

function findPartData(data: any, partId: string): any {
  for (const [key, value] of Object.entries(data)) {
    if (key.toLowerCase().replace(/\s+/g, "-") === partId) {
      return { name: key, ...value }
    }
    if (typeof value === "object" && !value.testsRun) {
      const found = findPartData(value, partId)
      if (found) return found
    }
  }
  return null
}

export default function TestModal({ partId, data, onClose }: TestModalProps) {
  const partData = findPartData(data, partId)

  if (!partData || !partData.testsRun) {
    return null
  }

  const passRate = (partData.passed / partData.testsRun) * 100
  const failed = partData.testsRun - partData.passed

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Good":
        return "bg-green-500"
      case "Warning":
        return "bg-yellow-500"
      case "Critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHealthVariant = (health: string) => {
    switch (health) {
      case "Good":
        return "default"
      case "Warning":
        return "secondary"
      case "Critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "Good":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "Critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getHealthIcon(partData.health)}
            {partData.name} Test Results
            <Badge variant={getHealthVariant(partData.health)}>{partData.health}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Test Summary */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{partData.testsRun}</div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-500">{partData.passed}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-2xl font-bold text-red-500">{failed}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>

          {/* Pass Rate Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Pass Rate
              </span>
              <span className="font-medium">{passRate.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <Progress value={passRate} className="h-3" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Health Status */}
          <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
            <div className={`w-3 h-3 rounded-full ${getHealthColor(partData.health)}`} />
            <span className="text-sm">
              System Status: <strong>{partData.health}</strong>
            </span>
          </div>

          {/* Additional Info */}
          {failed > 0 && (
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center gap-2 text-sm text-destructive font-medium mb-1">
                <XCircle className="h-4 w-4" />
                {failed} test{failed !== 1 ? "s" : ""} failed
              </div>
              <div className="text-xs text-muted-foreground">Review required before software rollout</div>
            </div>
          )}

          {partData.health === "Good" && (
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-1">
                <CheckCircle className="h-4 w-4" />
                All systems operational
              </div>
              <div className="text-xs text-muted-foreground">Ready for software rollout</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
