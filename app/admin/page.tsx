"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/layout/admin-header"
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar"
import { OverviewModule } from "@/components/admin/modules/overview/overview-module"
import { EventsModule } from "@/components/admin/modules/events/events-module"
import { MembersModule } from "@/components/admin/modules/members/members-module"
import { DonationsModule } from "@/components/admin/modules/donations/donations-module"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Settings, ImageIcon, BookOpen } from "lucide-react"
import { api } from "@/lib/api"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDateRange, setSelectedDateRange] = useState("7d")
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const analyticsData = await api.getAnalytics()
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to load initial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewModule selectedDateRange={selectedDateRange} />
      case "events":
        return <EventsModule />
      case "members":
        return <MembersModule />
      case "donations":
        return <DonationsModule />
      case "programs":
        return <ProgramsPlaceholder />
      case "media":
        return <MediaPlaceholder />
      case "settings":
        return <SettingsPlaceholder />
      default:
        return <OverviewModule selectedDateRange={selectedDateRange} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-orange-700 text-lg">Loading temple dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex flex-col">
      <AdminHeader
        activeMembers={analytics?.activeMembers || 0}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Fixed position */}
        <div className="hidden lg:block flex-shrink-0">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
              <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        )}

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-orange-900 mb-2">Temple Dashboard</h1>
                  <p className="text-orange-700">Manage your spiritual community with divine guidance</p>
                </div>
                <Button
                  variant="outline"
                  className="lg:hidden border-orange-300 text-orange-700 bg-transparent"
                  onClick={() => setSidebarOpen(true)}
                >
                  Menu
                </Button>
              </div>
            </div>

            {renderActiveModule()}
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder components for modules not yet implemented
function ProgramsPlaceholder() {
  return (
    <Card className="border-orange-200">
      <CardContent className="text-center py-12">
        <BookOpen className="w-16 h-16 text-orange-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-orange-900 mb-2">Programs Module</h3>
        <p className="text-orange-600 mb-6">Spiritual programs management coming soon</p>
        <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  )
}

function MediaPlaceholder() {
  return (
    <Card className="border-orange-200">
      <CardContent className="text-center py-12">
        <ImageIcon className="w-16 h-16 text-orange-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-orange-900 mb-2">Media Module</h3>
        <p className="text-orange-600 mb-6">Media management system coming soon</p>
        <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  )
}

function SettingsPlaceholder() {
  return (
    <Card className="border-orange-200">
      <CardContent className="text-center py-12">
        <Settings className="w-16 h-16 text-orange-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-orange-900 mb-2">Settings Module</h3>
        <p className="text-orange-600 mb-6">System settings and configuration coming soon</p>
        <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  )
}
