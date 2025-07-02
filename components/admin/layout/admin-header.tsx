"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sparkles, Bell, Activity, Globe, Menu, Settings, LogOut, User, Moon, Sun } from "lucide-react"
import Link from "next/link"

interface AdminHeaderProps {
  activeMembers?: number
  selectedDateRange: string
  onDateRangeChange: (value: string) => void
}

export function AdminHeader({ activeMembers = 0, selectedDateRange, onDateRangeChange }: AdminHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-orange-800">ISKCON Admin</h1>
              <p className="text-sm text-orange-600">Temple Management Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-orange-100 rounded-lg px-3 py-2">
              <Activity className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Live: {activeMembers} devotees</span>
            </div>

            <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
              <SelectTrigger className="w-32 border-orange-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="border-orange-300 text-orange-700 relative bg-transparent">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 border-2 border-orange-200 cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-orange-500 text-white">AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                <Globe className="w-4 h-4 mr-2" />
                View Temple
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-orange-300 bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 bg-orange-100 rounded-lg px-3 py-2">
                    <Activity className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Live: {activeMembers} devotees</span>
                  </div>

                  <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
                    <SelectTrigger className="border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 3 months</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>

                  <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>

                  <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>

                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-orange-300 text-orange-700 bg-transparent justify-start"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      View Temple
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
