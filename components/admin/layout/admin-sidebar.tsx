"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  ImageIcon,
  Settings,
  Home,
  Bell,
  FileText,
  Heart,
} from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

const sidebarItems = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
    description: "Dashboard & Analytics",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    description: "Manage Events",
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    description: "Community Management",
  },
  {
    id: "donations",
    label: "Donations",
    icon: DollarSign,
    description: "Financial Tracking",
  },
  {
    id: "programs",
    label: "Programs",
    icon: BookOpen,
    description: "Spiritual Programs",
  },
  {
    id: "media",
    label: "Media",
    icon: ImageIcon,
    description: "Content Management",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    description: "System Configuration",
  },
]

export function AdminSidebar({ activeTab, onTabChange, className }: AdminSidebarProps) {
  return (
    <div className={cn("w-64 h-screen bg-white border-r border-orange-200 flex flex-col", className)}>
      <div className="p-4 border-b border-orange-200">
        <h2 className="text-lg font-semibold tracking-tight text-orange-900">Temple Management</h2>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start mb-1 h-auto py-3 px-4",
                activeTab === item.id
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg"
                  : "text-orange-700 hover:bg-orange-50 hover:text-orange-900",
              )}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-orange-200">
          <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-orange-700">Quick Actions</h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-orange-600 hover:bg-orange-50 hover:text-orange-800"
            >
              <Home className="mr-3 h-4 w-4" />
              Temple Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-orange-600 hover:bg-orange-50 hover:text-orange-800"
            >
              <Bell className="mr-3 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-orange-600 hover:bg-orange-50 hover:text-orange-800"
            >
              <FileText className="mr-3 h-4 w-4" />
              Reports
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-orange-600 hover:bg-orange-50 hover:text-orange-800"
            >
              <Heart className="mr-3 h-4 w-4" />
              Support
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
