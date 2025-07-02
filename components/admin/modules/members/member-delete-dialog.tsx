"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Loader2 } from "lucide-react"
import type { Member } from "@/lib/api"

interface MemberDeleteDialogProps {
  member: Member | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
  loading: boolean
}

export function MemberDeleteDialog({ member, open, onOpenChange, onConfirm, loading }: MemberDeleteDialogProps) {
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

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-red-900">Remove Member</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Member Info */}
        <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <Avatar className="w-12 h-12 border-2 border-orange-200">
            <AvatarImage src={member.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-orange-500 text-white">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-orange-900">{member.name}</h4>
            <p className="text-sm text-orange-600">{member.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={`${getRoleColor(member.role)} text-xs`}>{member.role}</Badge>
              {member.spiritualName && <span className="text-xs text-orange-500">"{member.spiritualName}"</span>}
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Are you sure you want to remove {member.name} from the temple community?</strong>
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800">
              <strong>This will permanently delete:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-700 space-y-1">
              <li>Member profile and contact information</li>
              <li>Event attendance history ({member.eventsAttended} events)</li>
              <li>Donation records (${member.donations.toLocaleString()} total)</li>
              <li>All associated spiritual interests and notes</li>
            </ul>
          </div>
          <p className="text-red-600 font-medium">This action cannot be undone.</p>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="border-orange-300 bg-transparent">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              "Remove Member"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
