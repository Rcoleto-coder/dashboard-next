'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
  error?: string
}

export async function LoginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {

    const email = formData.get("email")?.toString().trim().toLowerCase()
    const password = formData.get("password")?.toString()

    // Server-side validation
    if (!email || !password) {
        return { error: "Email and password are required." }
    }

    // Send credentials to the backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
    })

    if (!response.ok) {
        return { error: "Invalid email or password." }
    }

    // we now have a successful login, let's grab the token and set it in a cookie
    const token = await response.json()
    console.log("Received token:", token)

    if (!token) {
        return { error: "No auth token returned from API." }
    }

    const cookieStore = await cookies()

    cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
    })

    redirect("/")
}
