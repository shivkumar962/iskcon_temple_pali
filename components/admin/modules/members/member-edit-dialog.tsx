"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Save, Loader2, X, Plus } from "lucide-react"
import type { Member } from "@/lib/api"

interface MemberEditDialogProps {
  member: Member | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (member: Member) => Promise<void>
}

const interestOptions = [
  "bhagavad-gita",
  "kirtan",
  "cooking",
  "festivals",
  "meditation",
  "service",
  "philosophy",
  "yoga",
  "devotional-music",
  "temple-service",
]

export function MemberEditDialog({ member, open, onOpenChange, onSave }: MemberEditDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Member>>({})
  const [newInterest, setNewInterest] = useState("")

  // Initialize form data when member changes
  useState(() => {
    if (member) {
      setFormData({
        ...member,
        interests: member.interests || [],
      })
    }
  }, [member])

  const handleSave = async () => {
    if (!member || !formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const updatedMember = { ...member, ...formData } as Member
      await onSave(updatedMember)
      onOpenChange(false)
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
    } finally {
      setLoading(false)
    }
  }

  const addInterest = () => {
    if (newInterest && !formData.interests?.includes(newInterest)) {
      setFormData({
        ...formData,
        interests: [...(formData.interests || []), newInterest],
      })
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests?.filter((i) => i !== interest) || [],
    })
  }

  if (!member) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-900">Edit Member Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
            <Avatar className="w-16 h-16 border-2 border-orange-200">
              <AvatarImage src={member.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-orange-500 text-white text-lg">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-orange-900">{member.name}</h3>
              <p className="text-orange-600">Member since {member.joinDate}</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-orange-800 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-orange-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-orange-800 font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-orange-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-orange-800 font-medium">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spiritualName" className="text-orange-800 font-medium">
                  Spiritual Name
                </Label>
                <Input
                  id="spiritualName"
                  value={formData.spiritualName || ""}
                  onChange={(e) => setFormData({ ...formData, spiritualName: e.target.value })}
                  className="border-orange-200"
                  placeholder="e.g., Govinda Das"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-orange-800 font-medium">
                  Role
                </Label>
                <Select
                  value={formData.role || "devotee"}
                  onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="border-orange-200">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive" className="text-orange-800 font-medium">
                  Active Member
                </Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive ?? true}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </div>
          </div>

          {/* Spiritual Interests */}
          <div className="space-y-4">
            <Label className="text-orange-800 font-medium">Spiritual Interests</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.interests?.map((interest, index) => (
                <Badge key={index} variant="outline" className="border-orange-300 text-orange-700 bg-orange-50 pr-1">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={newInterest} onValueChange={setNewInterest}>
                <SelectTrigger className="flex-1 border-orange-200">
                  <SelectValue placeholder="Add spiritual interest" />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions
                    .filter((option) => !formData.interests?.includes(option))
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={addInterest}
                disabled={!newInterest}
                className="border-orange-300 bg-transparent"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Member Statistics (Read-only) */}
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">${member.donations.toLocaleString()}</p>
              <p className="text-sm text-orange-600">Total Donations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{member.eventsAttended}</p>
              <p className="text-sm text-orange-600">Events Attended</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">
                {Math.floor((Date.now() - new Date(member.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-sm text-orange-600">Days as Member</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-orange-300 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
