"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Shield, Loader, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "Verification code must be 6 digits")
    .matches(/^[0-9]+$/, "Verification code must contain only numbers")
    .required("Verification code is required"),
})

export default function VerifyPage() {
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  // Countdown timer for resend functionality
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const verifyOTP = async (otpData: any) => {
    // This would be replaced with actual API call
    // const response = await Authservice.verifyOTP(otpData)
    // return response
    
    // Simulating API call for now
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otpData.otp === "123456") {
          resolve({ success: true, message: "Email verified successfully!" })
        } else {
          reject({ message: "Invalid verification code. Please try again." })
        }
      }, 1500)
    })
  }

  const resendOTP = async () => {
    // This would be replaced with actual API call
    // const response = await Authservice.resendOTP({ email })
    // return response
    
    // Simulating API call for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Verification code sent successfully!" })
      }, 1000)
    })
  }

  const verifyMutation = useMutation({
    mutationFn: (otpData: any) => verifyOTP(otpData),
    onSuccess: (data: any) => {
      console.log("Verification successful", data)
      setIsVerified(true)
      toast.success(data.message || "Email verified successfully!")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    },
    onError: (error: any) => {
      console.log("Verification failed:", error)
      toast.error(error.message || "Verification failed. Please try again.")
    },
  })

  const resendMutation = useMutation({
    mutationFn: () => resendOTP(),
    onSuccess: (data: any) => {
      console.log("OTP resent successfully", data)
      toast.success(data.message || "Verification code sent successfully!")
      setCountdown(60) // Start 60 second countdown
    },
    onError: (error: any) => {
      console.log("Resend failed:", error)
      toast.error(error.message || "Failed to resend verification code.")
    },
  })

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Verification attempt:", values)
      verifyMutation.mutate(values)
    },
  })

  const handleResendOTP = () => {
    if (countdown === 0) {
      setIsResending(true)
      resendMutation.mutate()
      setIsResending(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    formik.setFieldValue('otp', value)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-300 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-amber-300 rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-orange-300 rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-12 h-12 border-2 border-amber-300 rounded-full"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <Card className="border-orange-200 shadow-2xl backdrop-blur-sm bg-white/95">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Email Verified!</h2>
              <p className="text-green-700 mb-6">Your email has been successfully verified. Redirecting to login...</p>
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mx-1" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-amber-300 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-orange-300 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 border-2 border-amber-300 rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-9 h-9 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-orange-800">ISKCON Temple</h1>
              <p className="text-sm text-orange-600">🕉️ Hare Krishna 🕉️</p>
            </div>
          </Link>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mx-auto"></div>
        </div>

        <Card className="border-orange-200 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center space-y-3 pb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-900">Verify Your Email</CardTitle>
            <CardDescription className="text-orange-700 text-base">
              We've sent a 6-digit verification code to
            </CardDescription>
            {email && (
              <div className="bg-orange-50 px-4 py-2 rounded-lg">
                <p className="text-orange-800 font-medium">{email}</p>
              </div>
            )}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="otp" className="text-orange-800 font-semibold flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Enter Verification Code
                </Label>
                <div className="flex justify-center">
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="000000"
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400 h-12 text-center text-2xl font-mono tracking-widest max-w-xs"
                    maxLength={6}
                  />
                </div>
                <div className="text-red-500 text-sm h-4 text-center">
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-sm">{formik.errors.otp}</p>
                  )}
                </div>
              </div>

              <Button
                disabled={formik.values.otp.length !== 6 || formik.isSubmitting || verifyMutation.isPending}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Shield className="w-5 h-5 mr-2" />
                {formik.isSubmitting || verifyMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-full h-px bg-orange-200"></div>
                <span className="text-orange-600 text-sm px-4">or</span>
                <div className="w-full h-px bg-orange-200"></div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isResending || resendMutation.isPending}
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isResending || resendMutation.isPending ? 'animate-spin' : ''}`} />
                  {countdown > 0 
                    ? `Resend in ${countdown}s` 
                    : isResending || resendMutation.isPending 
                      ? "Sending..." 
                      : "Resend Code"
                  }
                </Button>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full text-orange-600 hover:text-orange-800 font-medium hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-orange-700 text-sm">
                Didn't receive the code? Check your spam folder or{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={countdown > 0}
                  className="text-orange-600 hover:text-orange-800 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  try a different email
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
