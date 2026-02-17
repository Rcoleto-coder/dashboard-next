import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Constants
import { ROUTES } from "@/constants"

export function proxy(request: NextRequest) {
    
    const authToken = request.cookies.get("auth_token")?.value
    
    const pathname  = request.nextUrl.pathname
    // If the user is visiting the login page:
    // - if already authenticated -> redirect to home
    // - otherwise allow the request (show login)
    const isLoginPage = pathname === ROUTES.LOGIN
    const isSignupPage = pathname === ROUTES.SIGNUP

    // Authenticated users should never see /login or /signup
    if ((isLoginPage || isSignupPage) && authToken) {
        return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
    }

    // Unauthenticated users cannot see protected routes
    if (!authToken && !isLoginPage && !isSignupPage) {
        // Redirect to the login page if the user is not authenticated
        return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/login",
        "/signup",
    ],
}
