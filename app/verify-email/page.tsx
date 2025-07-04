'use client'

import { Suspense } from 'react'
import VerifyEmailComponent from '@/components/verifyEmail/verifyEmail'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <VerifyEmailComponent />
    </Suspense>
  )
}
