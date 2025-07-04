"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Shield, Loader, ArrowLeft, RefreshCw, CheckCircle, Lock } from "lucide-react"
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

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const verifyOTP = async (otpData: any) => {
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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Verification code sent successfully!" })
      }, 1000)
    })
  }

  const verifyMutation = useMutation({
    mutationFn: (otpData: any) => verifyOTP(otpData),
    onSuccess: (data: any) => {
      setIsVerified(true)
      toast.success(data.message || "Email verified successfully!")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    },
    onError: (error: any) => {
      toast.error(error.message || "Verification failed. Please try again.")
    },
  })

  const resendMutation = useMutation({
    mutationFn: () => resendOTP(),
    onSuccess: (data: any) => {
      toast.success(data.message || "Verification code sent successfully!")
      setCountdown(60)
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to resend verification code.")
    },
  })

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
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
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-300 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-amber-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-orange-300 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 right-10 w-12 h-12 border-2 border-amber-300 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
          <div className="absolute top-1/3 right-1/3 w-10 h-10 border-2 border-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.8s" }}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <Card className="border-orange-200 shadow-2xl backdrop-blur-sm bg-white/95 transform transition-all duration-500 hover:scale-105">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 animate-fade-in">Email Verified!</h2>
              <p className="text-green-700 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Your email has been successfully verified. Redirecting to login...
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
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
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-amber-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-orange-300 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 border-2 border-amber-300 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 border-2 border-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.8s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Enhanced Header with Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Sparkles className="w-9 h-9 text-white group-hover:animate-spin" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-orange-800 group-hover:text-orange-900 transition-colors">ISKCON Temple</h1>
              <p className="text-sm text-orange-600 group-hover:text-orange-700 transition-colors">🕉️ Hare Krishna 🕉️</p>
            </div>
          </Link>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mx-auto animate-pulse"></div>
        </div>

        <Card className="border-orange-200 shadow-2xl backdrop-blur-sm bg-white/95 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
              <Mail className="w-10 h-10 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-orange-900 bg-gradient-to-r from-orange-800 to-amber-800 bg-clip-text text-transparent">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-orange-700 text-lg font-medium">
              We've sent a 6-digit verification code to
            </CardDescription>
            {email && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 rounded-xl border border-orange-200 shadow-sm">
                <p className="text-orange-800 font-semibold text-lg">{email}</p>
              </div>
            )}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="otp" className="text-orange-800 font-semibold flex items-center justify-center text-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  Enter Verification Code
                </Label>
                <div className="flex justify-center">
                  <div className="relative">
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="000000"
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.otp}
                      className="border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 h-14 text-center text-3xl font-mono tracking-widest max-w-xs rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      maxLength={6}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </div>
                <div className="text-red-500 text-sm h-4 text-center">
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-sm animate-shake">{formik.errors.otp}</p>
                  )}
                </div>
              </div>

              <Button
                disabled={formik.values.otp.length !== 6 || formik.isSubmitting || verifyMutation.isPending}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl border-0"
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
                <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                <span className="text-orange-600 text-sm px-4 font-medium">or</span>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isResending || resendMutation.isPending}
                  className="w-full border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-800 transition-all duration-300 rounded-xl py-3 font-medium"
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
                  className="inline-flex items-center justify-center w-full text-orange-600 hover:text-orange-800 font-medium hover:underline transition-colors duration-300 py-2 rounded-lg hover:bg-orange-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-orange-700 text-sm leading-relaxed">
                Didn't receive the code? Check your spam folder or{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={countdown > 0}
                  className="text-orange-600 hover:text-orange-800 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  try a different email
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
} 