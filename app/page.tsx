"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
 const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard on load
    router.push("/dashboard")
  }, [router])
 return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading Survey System...</p>
      </div>
    </div>
  )
}
