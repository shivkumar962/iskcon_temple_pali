"use client"

import type React from "react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Eye, EyeOff, Mail, Shield, Loader } from "lucide-react"
import Link from "next/link"
import Authservice from "@/service/authService"
import { useMutation } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { login } from "../../store/slice/authSlice"


const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)
  console.log("user", user)

  const loginUser = async (userData: any) => {
    const response = await Authservice.login(userData)
    return response
  }

  const loginMutation = useMutation({
    mutationFn: (userData: any) => loginUser(userData),
    onSuccess: (data: any) => {
      console.log("login successful22", data.data.data)
      dispatch(login(data.data.data))
      toast.success(data.data.data.message)
      setTimeout(() => {
        formik.resetForm()
        router.push("/")
      }, 3000)
    },
    onError: (error: any) => {
      console.log("login failed:", error)
      toast.error(error.response.data.message)
      // formik.resetForm()
    },
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Login attempt:", values)
      loginMutation.mutate(values)
    },
  })

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
            <CardTitle className="text-3xl font-bold text-orange-900">Welcome Back</CardTitle>
            <CardDescription className="text-orange-700 text-lg">
              Continue your spiritual journey with us
            </CardDescription>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={formik.handleSubmit} className="space-y-1">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-orange-800 font-semibold flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400 h-10 text-lg"
                />
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>
              </div>

                <div className="space-y-1">
                <Label htmlFor="password" className="text-orange-800 font-semibold flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400 pr-12 h-10 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="text-red-500 text-sm h-4">
                    {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formik.values.rememberMe}
                    onCheckedChange={(checked) => formik.setFieldValue("rememberMe", checked)}
                    className="border-orange-300 data-[state=checked]:bg-orange-500"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-orange-700 font-medium">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-800 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                disabled={!formik.values.rememberMe  || formik.isSubmitting || loginMutation.isPending}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {formik.isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                {formik.isSubmitting ? "Signing in..." : "Sign In to Temple"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-orange-700 text-lg">
                New to our community?{" "}
                <Link href="/signup" className="text-orange-600 hover:text-orange-800 font-semibold hover:underline">
                  Join our spiritual family
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-orange-600 font-medium text-lg">🕉️ Hare Krishna Hare Krishna Krishna Krishna Hare Hare 🕉️</p>
          <p className="text-orange-600 font-medium text-lg mt-2">🕉️ Hare Rama Hare Rama Rama Rama Hare Hare 🕉️</p>
        </div>
      </div>
    </div>
  )
}
