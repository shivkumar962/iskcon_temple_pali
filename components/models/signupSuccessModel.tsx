"use client"

import React from "react"
import { CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SignupSuccessModalProps {
  open: boolean
  onClose: () => void
}

const SignupSuccessModal: React.FC<SignupSuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="text-green-500 w-10 h-10" />
            <DialogTitle className="text-xl font-semibold">Registration Successful</DialogTitle>
            <DialogDescription>
              Please check your email to verify your account.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Button onClick={() => window.open("https://mail.google.com", "_blank")}
          className="mt-4 w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium py-2.5">
          Okay
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SignupSuccessModal
