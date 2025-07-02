"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  DollarSign,
  Calendar,
  BookOpen,
  TrendingUp,
  Activity,
  Eye,
  Crown,
  Heart,
  CalendarIcon,
  Zap,
  Plus,
  Mail,
  Camera,
  FileText,
} from "lucide-react"
import Image from "next/image"
import { api, type Member, type Event } from "@/lib/api"

interface OverviewModuleProps {
  selectedDateRange: string
}

export function OverviewModule({ selectedDateRange }: OverviewModuleProps) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [selectedDateRange])

  const loadData = async () => {
    setLoading(true)
    try {
      const [analyticsData, eventsData, membersData] = await Promise.all([
        api.getAnalytics(),
        api.getEvents(),
        api.getMembers(),
      ])

      setAnalytics(analyticsData)
      setEvents(eventsData)
      setMembers(membersData)
    } catch (error) {
      console.error("Failed to load overview data:", error)
    } finally {
      setLoading(false)
    }
  }

  const topDonors = members
    .sort((a, b) => b.donations - a.donations)
    .slice(0, 3)
    .map((member, index) => ({
      ...member,
      rank: index + 1,
    }))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-orange-200 animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-orange-100 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="border-orange-200 bg-gradient-to-br from-white to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Members</CardTitle>
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-orange-900">{analytics?.totalMembers || 0}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />+{Math.floor(Math.random() * 20) + 5} this month
            </div>
            <Progress value={75} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-green-50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Monthly Donations</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-orange-900">
              ${analytics?.monthlyDonations?.toLocaleString() || 0}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </div>
            <Progress value={85} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Active Events</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-orange-900">{analytics?.upcomingEvents || 0}</div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <CalendarIcon className="w-3 h-3 mr-1" />
              Next: Janmashtami
            </div>
            <Progress value={60} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-purple-50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Active Programs</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-orange-900">{analytics?.activePrograms || 0}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <Heart className="w-3 h-3 mr-1" />
              All running smoothly
            </div>
            <Progress value={96} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Activity Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <Card className="lg:col-span-2 border-orange-200 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-orange-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Events
                </CardTitle>
                <CardDescription>Latest temple events and activities</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-orange-300 bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-full sm:w-16 h-32 sm:h-16 rounded-lg overflow-hidden bg-orange-200 flex-shrink-0">
                    {event.image ? (
                      <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-orange-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-semibold text-orange-900 truncate">{event.name}</h4>
                      <Badge
                        variant={event.status === "upcoming" ? "default" : "secondary"}
                        className={event.status === "upcoming" ? "bg-orange-500" : "bg-green-500"}
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-600 mt-1">
                      {event.date} • {event.currentAttendees} attendees
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
                      <div className="text-xs text-orange-700">
                        Budget: ${event.budget} | Spent: ${event.spent}
                      </div>
                      <Progress value={(event.spent / event.budget) * 100} className="w-full sm:w-20 h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Contributors */}
        <Card className="border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-orange-900 flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Top Contributors
            </CardTitle>
            <CardDescription>Most active community members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDonors.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg"
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-orange-200">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-500 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {member.rank === 1 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-orange-900 truncate">{member.name}</p>
                    <p className="text-sm text-orange-600">{member.eventsAttended} events attended</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700">${member.donations.toLocaleString()}</p>
                    <p className="text-xs text-orange-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-orange-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently used temple management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Plus, label: "Add Event", color: "from-blue-500 to-indigo-600" },
              { icon: Users, label: "New Member", color: "from-green-500 to-emerald-600" },
              { icon: DollarSign, label: "Record Donation", color: "from-yellow-500 to-orange-600" },
              { icon: Mail, label: "Send Newsletter", color: "from-purple-500 to-pink-600" },
              { icon: Camera, label: "Upload Photos", color: "from-red-500 to-rose-600" },
              { icon: FileText, label: "Generate Report", color: "from-gray-500 to-slate-600" },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col space-y-2 border-orange-200 hover:bg-orange-50 group bg-transparent"
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform duration-200`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-orange-800 text-center">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
