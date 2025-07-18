import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryProvider from "@/providers/queryProvider"
import  Provider from "../store/provider"
import ReactToast from "@/components/ui/react-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ISKCON Temple - Hare Krishna Divine Community",
  description:
    "Experience the bliss of Krishna consciousness through devotion, community, and spiritual growth. Join us in our journey towards divine enlightenment.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <QueryProvider>
            <ReactToast />
            {children}
          </QueryProvider>
        </Provider>
      </body>
    </html>
  )
}
