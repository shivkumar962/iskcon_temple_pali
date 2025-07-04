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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Eye, EyeOff, Loader, Loader2 } from "lucide-react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import Authservice from "../../service/authService"
import SignupSuccessModal from "@/components/models/signupSuccessModel"
import { login } from "@/store/slice/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

// Yup validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address must be less than 100 characters")
    .required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/, "Password must be at least 6 characters and contain only valid characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  spiritualName: Yup.string()
    .max(100, "Spiritual name must be less than 100 characters")
    .required("Spiritual name is required"),
  // interests: Yup.string()
  //   .required("Please select your spiritual interest"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),

})

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: any) => state.user)
  console.log("user", user)

  const signupUser = async (userData: any) => {
    const response = await Authservice.signup(userData)
    console.log("response2222222222", response)
    return response
  }

  const signupMutation = useMutation({
    mutationFn: (userData: any) => signupUser(userData),
    onSuccess: (data: any) => {
      console.log("Registration successful", data)
      setIsSignupSuccess(true)
      dispatch(login(data.data.data))
      setTimeout(() => {
        router.push("/login")
      }, 8000)
      formik.resetForm()
    },
    onError: (error: any) => {
      console.log("Registration failed:", error)
      toast.error(error.response.data.message)
      formik.resetForm()
    },
  })


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      spiritualName: "",
      interests: "",
      agreeToTerms: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values: any) => {
      signupMutation.mutate(values)
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-orange-800">ISKCON Temple</h1>
              <p className="text-sm text-orange-600">Hare Krishna</p>
            </div>
          </Link>
        </div>

        <Card className="border-orange-200 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-orange-900">Join Our Spiritual Community</CardTitle>
            <CardDescription className="text-orange-700">Begin your journey in Krishna consciousness</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-1">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-orange-800 font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.firstName && formik.errors.firstName ? "border-red-500" : ""
                      }`}
                  />
                  <div className="text-red-500 text-sm h-4">
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-orange-800 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.lastName && formik.errors.lastName ? "border-red-500" : ""
                      }`}
                  />
                  <div className="text-red-500 text-sm h-4">
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-orange-800 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.email && formik.errors.email ? "border-red-500" : ""
                    }`}
                />
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-orange-800 font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.phone && formik.errors.phone ? "border-red-500" : ""
                    }`}
                />
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="spiritualName" className="text-orange-800 font-medium">
                  Spiritual Name
                </Label>
                <Input
                  id="spiritualName"
                  name="spiritualName"
                  placeholder="e.g., Govinda Das, Radha Devi"
                  value={formik.values.spiritualName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.spiritualName && formik.errors.spiritualName ? "border-red-500" : ""
                    }`}
                />
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.spiritualName && formik.errors.spiritualName && (
                    <p className="text-red-500 text-sm">{formik.errors.spiritualName}</p>
                  )}
                </div>
              </div>

              {/* <div className="space-y-1">
                <Label htmlFor="interests" className="text-orange-800 font-medium">
                  Spiritual Interests
                </Label>
                <Select
                  onValueChange={(value) => formik.setFieldValue("interests", value)}
                  value={formik.values.interests}
                >
                  <SelectTrigger className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.interests && formik.errors.interests ? "border-red-500" : ""
                    }`}>
                    <SelectValue placeholder="Select your primary interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bhagavad-gita">Bhagavad Gita Study</SelectItem>
                    <SelectItem value="kirtan">Kirtan & Devotional Music</SelectItem>
                    <SelectItem value="cooking">Spiritual Cooking</SelectItem>
                    <SelectItem value="festivals">Festival Celebrations</SelectItem>
                    <SelectItem value="meditation">Meditation & Prayer</SelectItem>
                    <SelectItem value="service">Community Service</SelectItem>
                    <SelectItem value="philosophy">Vedic Philosophy</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.interests && formik.errors.interests && (
                    <p className="text-red-500 text-sm">{formik.errors.interests}</p>
                  )}
                </div>
              </div> */}

              <div className="space-y-1">
                <Label htmlFor="address" className="text-orange-800 font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${formik.touched.address && formik.errors.address ? "border-red-500" : ""
                    }`}
                />
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-500 text-sm">{formik.errors.address}</p>
                  )}
                </div>
              </div>



              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-orange-800 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 pr-10 ${formik.touched.password && formik.errors.password ? "border-red-500" : ""
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-red-500 text-sm h-4">
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-orange-800 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 pr-10 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : ""
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-red-500 text-sm h-4">
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    name="agreeToTerms"
                    checked={formik.values.agreeToTerms}
                    onCheckedChange={(checked) => formik.setFieldValue("agreeToTerms", checked)}
                    className="border-orange-300 data-[state=checked]:bg-orange-500"
                  />
                  <Label htmlFor="terms" className="text-sm text-orange-700">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <div className="text-red-500 text-sm h-4">
                  {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                    <p className="text-red-500 text-sm">{formik.errors.agreeToTerms}</p>
                  )}
                </div>

              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium py-2.5"
                disabled={!formik.values.agreeToTerms || formik.isSubmitting || formik.isSubmitting || signupMutation.isPending}
              >
                {formik.isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                {formik.isSubmitting ? "Joining..." : "Join Our Community"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-orange-700">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-600 hover:text-orange-800 font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-orange-600">🕉️ Welcome to the path of devotion and spiritual growth 🕉️</p>
        </div>
      </div>
      <SignupSuccessModal open={isSignupSuccess} onClose={() => setIsSignupSuccess(false)} />
    </div>
  )
}
