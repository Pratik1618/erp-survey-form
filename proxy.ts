import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { stripBasePath } from '@/lib/path-utils'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname, basePath } = request.nextUrl
  const appPath = stripBasePath(pathname, basePath)

  // Allow public files
  if (
    appPath.startsWith('/_next') ||
    appPath.startsWith('/api') ||
    appPath.startsWith('/favicon.ico') ||
    appPath.includes('.')
  ) {
    return NextResponse.next()
  }

  const isLoginPage = appPath === '/login'

  if (!token && !isLoginPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  if (token && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}
