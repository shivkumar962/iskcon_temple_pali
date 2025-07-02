"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Filter,
  Users,
  Eye,
  Edit,
  Trash2,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Heart,
  Star,
  UserPlus,
} from "lucide-react"
import { api, type Member } from "@/lib/api"

// Add these imports at the top
import { MemberViewDialog } from "./member-view-dialog"
import { MemberEditDialog } from "./member-edit-dialog"
import { MemberDeleteDialog } from "./member-delete-dialog"

export function MembersModule() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "devotee" as const,
    spiritualName: "",
    interests: [] as string[],
  })

  // Add these state variables after the existing useState declarations
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const membersData = await api.getMembers()
      setMembers(membersData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load members",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMember = async () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const memberData = {
        ...newMember,
        joinDate: new Date().toISOString().split("T")[0],
        isActive: true,
        donations: 0,
        eventsAttended: 0,
      }

      const createdMember = await api.createMember(memberData)
      setMembers([...members, createdMember])
      setNewMember({
        name: "",
        email: "",
        phone: "",
        role: "devotee",
        spiritualName: "",
        interests: [],
      })
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Member added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add these handler functions after handleCreateMember
  const handleViewMember = (member: Member) => {
    setSelectedMember(member)
    setViewDialogOpen(true)
  }

  const handleEditMember = (member: Member) => {
    setSelectedMember(member)
    setEditDialogOpen(true)
  }

  const handleDeleteMember = (member: Member) => {
    setSelectedMember(member)
    setDeleteDialogOpen(true)
  }

  const handleSaveMember = async (updatedMember: Member) => {
    setLoading(true)
    try {
      const savedMember = await api.updateMember(updatedMember.id, updatedMember)
      setMembers(members.map((m) => (m.id === savedMember.id ? savedMember : m)))
      toast({
        title: "Success",
        description: "Member updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!selectedMember) return

    setLoading(true)
    try {
      await api.deleteMember(selectedMember.id)
      setMembers(members.filter((m) => m.id !== selectedMember.id))
      setDeleteDialogOpen(false)
      setSelectedMember(null)
      toast({
        title: "Success",
        description: "Member removed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove member",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.spiritualName && member.spiritualName.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = filterRole === "all" || member.role === filterRole
    return matchesSearch && matchesRole
  })

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-orange-900">Member Management</h2>
          <p className="text-orange-700">Manage temple community members and devotees</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg w-full lg:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>Add a new member to the temple community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Full Name *</Label>
                <Input
                  id="memberName"
                  placeholder="Enter full name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberEmail">Email *</Label>
                <Input
                  id="memberEmail"
                  type="email"
                  placeholder="Enter email address"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberPhone">Phone</Label>
                <Input
                  id="memberPhone"
                  placeholder="Enter phone number"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberRole">Role</Label>
                <Select
                  value={newMember.role}
                  onValueChange={(value: any) => setNewMember({ ...newMember, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="devotee">Devotee</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="priest">Priest</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="spiritualName">Spiritual Name</Label>
                <Input
                  id="spiritualName"
                  placeholder="e.g., Govinda Das"
                  value={newMember.spiritualName}
                  onChange={(e) => setNewMember({ ...newMember, spiritualName: e.target.value })}
                />
              </div>
              <Button
                onClick={handleCreateMember}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="border-orange-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 w-4 h-4" />
                <Input
                  placeholder="Search members by name, email, or spiritual name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-orange-200"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full sm:w-48 border-orange-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="devotee">Devotee</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="priest">Priest</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Total Members</p>
                <p className="text-2xl font-bold text-orange-900">{members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Active Members</p>
                <p className="text-2xl font-bold text-orange-900">{members.filter((m) => m.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Volunteers</p>
                <p className="text-2xl font-bold text-orange-900">
                  {members.filter((m) => m.role === "volunteer").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">New This Month</p>
                <p className="text-2xl font-bold text-orange-900">
                  {
                    members.filter((m) => {
                      const joinDate = new Date(m.joinDate)
                      const now = new Date()
                      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <Card className="border-orange-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-orange-900">Member Directory</CardTitle>
          <CardDescription>All temple community members ({filteredMembers.length} members)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => {
              const activity = getActivityLevel(member.eventsAttended)
              return (
                <div
                  key={member.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors space-y-4 lg:space-y-0"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <Avatar className="w-12 h-12 border-2 border-orange-200 flex-shrink-0">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-500 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-semibold text-orange-900 truncate">{member.name}</h4>
                        <Badge className={`${getRoleColor(member.role)} text-xs`}>{member.role}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-orange-600 mt-1">
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        {member.phone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                      {member.spiritualName && (
                        <p className="text-xs text-orange-500 mt-1">Spiritual Name: {member.spiritualName}</p>
                      )}
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-orange-500" />
                          <span className="text-xs text-orange-600">Joined {member.joinDate}</span>
                        </div>
                        <div className={`flex items-center text-xs ${activity.color}`}>
                          <div className="flex mr-1">
                            {Array.from({ length: activity.stars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <span>{activity.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:flex-shrink-0">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-green-700">${member.donations.toLocaleString()}</p>
                        <p className="text-xs text-orange-600">Donations</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-700">{member.eventsAttended}</p>
                        <p className="text-xs text-orange-600">Events</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMember(member)}
                        className="flex-1 sm:flex-initial border-orange-300 bg-transparent"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditMember(member)}
                        className="flex-1 sm:flex-initial border-orange-300 bg-transparent"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMember(member)}
                        className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {filteredMembers.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-900 mb-2">No Members Found</h3>
            <p className="text-orange-600 mb-6">
              {searchTerm || filterRole !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Add your first member to get started"}
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </CardContent>
        </Card>
      )}

      <MemberViewDialog member={selectedMember} open={viewDialogOpen} onOpenChange={setViewDialogOpen} />

      <MemberEditDialog
        member={selectedMember}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveMember}
      />

      <MemberDeleteDialog
        member={selectedMember}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </div>
  )
}
