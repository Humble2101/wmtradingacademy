import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Admin-only routes
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Investor dashboard → only investors (or admin)
    if (pathname.startsWith('/dashboard/investor') && token?.role === 'STUDENT') {
      return NextResponse.redirect(new URL('/dashboard/student', req.url))
    }

    // Student dashboard → only students (or admin)
    if (pathname.startsWith('/dashboard/student') && token?.role === 'INVESTOR') {
      return NextResponse.redirect(new URL('/dashboard/investor', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        // Routes that require authentication
        const protectedRoutes = ['/dashboard', '/admin']
        if (protectedRoutes.some(r => pathname.startsWith(r))) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
