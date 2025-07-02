"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, Heart, Star, User, Crown, Activity, DollarSign, Users, Clock } from "lucide-react"
import type { Member } from "@/lib/api"

interface MemberViewDialogProps {
  member: Member | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MemberViewDialog({ member, open, onOpenChange }: MemberViewDialogProps) {
  if (!member) return null

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500 text-white"
      case "priest":
        return "bg-purple-500 text-white"
      case "volunteer":
        return "bg-blue-500 text-white"
      default:
        return "bg-orange-500 text-white"
    }
  }

  const getActivityLevel = (eventsAttended: number) => {
    if (eventsAttended >= 20) return { level: "Very Active", color: "text-green-600", stars: 5 }
    if (eventsAttended >= 10) return { level: "Active", color: "text-blue-600", stars: 4 }
    if (eventsAttended >= 5) return { level: "Regular", color: "text-orange-600", stars: 3 }
    if (eventsAttended >= 1) return { level: "Occasional", color: "text-yellow-600", stars: 2 }
    return { level: "New", color: "text-gray-600", stars: 1 }
  }

  const activity = getActivityLevel(member.eventsAttended)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-900">Member Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-orange-200">
                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-orange-500 text-white text-2xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {member.role === "admin" && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-orange-900">{member.name}</h2>
              {member.spiritualName && <p className="text-lg text-orange-700 font-medium">"{member.spiritualName}"</p>}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <Badge className={`${getRoleColor(member.role)} text-sm`}>{member.role}</Badge>
                <Badge variant={member.isActive ? "default" : "secondary"} className="text-sm">
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline" className={`border-orange-300 ${activity.color} bg-orange-50 text-sm`}>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {Array.from({ length: activity.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    {activity.level}
                  </div>
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600">Email</p>
                    <p className="font-medium text-orange-900">{member.email}</p>
                  </div>
                </div>
                {member.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Phone className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600">Phone</p>
                      <p className="font-medium text-orange-900">{member.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600">Join Date</p>
                    <p className="font-medium text-orange-900">{member.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600">Member Since</p>
                    <p className="font-medium text-orange-900">
                      {Math.floor((Date.now() - new Date(member.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity & Contributions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-orange-700">Events Attended</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-700">{member.eventsAttended}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-orange-700">Total Donations</span>
                  </div>
                  <span className="text-2xl font-bold text-green-700">${member.donations.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span className="text-orange-700">Activity Level</span>
                  </div>
                  <span className={`font-bold ${activity.color}`}>{activity.level}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Spiritual Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {member.interests && member.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-orange-600 italic">No interests specified</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Timeline */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Attended Janmashtami Celebration</p>
                    <p className="text-xs text-orange-600">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Made donation for temple maintenance</p>
                    <p className="text-xs text-orange-600">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Joined Bhagavad Gita study circle</p>
                    <p className="text-xs text-orange-600">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
