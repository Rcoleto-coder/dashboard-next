import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
    
    const authToken = request.cookies.get("auth_token")?.value
    
    const pathname  = request.nextUrl.pathname
    // If the user is visiting the login page:
    // - if already authenticated -> redirect to home
    // - otherwise allow the request (show login)
    const isLoginPage = pathname === "/login"

    // Authenticated users should never see /login
    if (isLoginPage && authToken) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    // Unauthenticated users cannot see protected routes
    if (!authToken && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/login",
    ],
}
