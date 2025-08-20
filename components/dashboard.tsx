"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CarView from "@/components/car-view"
import TreeView from "@/components/tree-view"
import TestModal from "@/components/test-modal"
import { mockTestData } from "@/lib/mock-data"
import { Activity, Shield, Zap } from "lucide-react"

interface DashboardProps {
  user: { username: string } | null
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null)

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId)
  }

  const handleTreeSelect = (partId: string) => {
    setHighlightedPart(partId)
  }

  const handleCloseModal = () => {
    setSelectedPart(null)
  }

  const calculateOverallStats = () => {
    let totalTests = 0
    let totalPassed = 0
    let criticalIssues = 0
    let warnings = 0

    const countStats = (data: any) => {
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === "object" && value.testsRun) {
          totalTests += value.testsRun
          totalPassed += value.passed
          if (value.health === "Critical") criticalIssues++
          if (value.health === "Warning") warnings++
        } else if (typeof value === "object") {
          countStats(value)
        }
      }
    }

    countStats(mockTestData)
    return { totalTests, totalPassed, criticalIssues, warnings }
  }

  const stats = calculateOverallStats()
  const overallPassRate = ((stats.totalPassed / stats.totalTests) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <h1 className="text-xl font-bold text-foreground">Tesla Final Testing Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 ml-8">
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {overallPassRate}% Pass Rate
              </Badge>
              {stats.criticalIssues > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {stats.criticalIssues} Critical
                </Badge>
              )}
              {stats.warnings > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {stats.warnings} Warnings
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.username}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-200"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Car View */}
        <div className="flex-1 p-6">
          <Card className="h-full shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Vehicle Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full">
              <CarView onPartClick={handlePartClick} highlightedPart={highlightedPart} />
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Tree View */}
        <div className="w-80 p-6 pl-0">
          <Card className="h-full shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                System Tree
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <TreeView data={mockTestData} onSelect={handleTreeSelect} selectedPart={highlightedPart} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Test Results Modal */}
      {selectedPart && <TestModal partId={selectedPart} data={mockTestData} onClose={handleCloseModal} />}
    </div>
  )
}
