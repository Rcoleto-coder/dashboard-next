import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
    const authToken = request.cookies.get("auth_token")?.value

    const { pathname } = request.nextUrl
    // If the user is visiting the login page:
    // - if already authenticated -> redirect to home
    // - otherwise allow the request (show login)
    if (pathname.startsWith("/login")) {
        if (authToken) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        return NextResponse.next()
    }

    // For all other protected routes: if no token -> redirect to login
    if (!authToken) {
        const loginUrl = new URL("/login", request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    // Match explicit home and dashboard routes plus other protected routes
    matcher: [
        "/",
        "/dashboard/:path*",
    ],
}
