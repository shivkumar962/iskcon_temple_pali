'use client'

import { useQuery } from '@tanstack/react-query'
import AuthService from '@/service/authService'
import { Loader, CheckCircle, XCircle, Mail, Sparkles } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const VerifyEmailPage: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  console.log("token", token)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['verifyEmail', token],
    queryFn: () => {
      if (!token) {
        return Promise.reject(new Error('No token provided.'))
      }
      return AuthService.verifyEmailToken(token)
    },
    enabled: !!token,
    retry: false,
  })

  let statusMessage: React.ReactNode = null
  let statusType: 'success' | 'error' | 'loading' = 'loading'

  if (isLoading) {
    statusType = 'loading'
    statusMessage = (
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse">
          <Loader className="w-8 h-8 text-orange-600 animate-spin" />
        </div>
        <p className="text-orange-700 text-lg font-medium">
          Verifying your email, please wait...
        </p>
      </div>
    )
  } else if (!token || isError) {
    statusType = 'error'
    const errorMessage =
      (error as any)?.response?.data?.message ||
      (error as any)?.message ||
      'Verification failed. Please try again or contact support.'
    statusMessage = !token ? 'Invalid verification link. No token provided.' : errorMessage
  } else if (data) {
    statusType = 'success'
    statusMessage = data.data.message || 'Email verified successfully! You can now login.'
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
        {/* Enhanced Header */}
        <div className="text-center mb-8">
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

        <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-orange-200 p-8 max-w-md w-full transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-900 bg-gradient-to-r from-orange-800 to-amber-800 bg-clip-text text-transparent mb-6">
              Email Verification
            </h1>

            <div className="mb-8">
              {statusType === 'loading' ? (
                statusMessage
              ) : statusType === 'success' ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-green-700 text-lg font-medium">
                    {statusMessage}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <p className="text-red-600 text-lg font-medium">
                    {statusMessage}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-4">
              {statusType === 'success' && (
                <Link
                  href="/login"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex justify-center items-center gap-2  "
                >
                  <Mail className="w-5 h-5" />
                  Go to Login
                </Link>
              )}
              {statusType === 'error' && (
                <>
                  <p className="text-orange-700 text-sm mb-6 leading-relaxed">
                    If your token has expired or is invalid, you might need to register again or contact support.
                  </p>
                  <Link
                    href="/signup"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex justify-center items-center gap-2  "
                  >
                    <Sparkles className="w-5 h-5" />
                    Go to Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

export default VerifyEmailPage 
