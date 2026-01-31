'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function LoginAction(formData: FormData): Promise<void> {

    const email = formData.get("email")?.toString().trim().toLowerCase()
    const password = formData.get("password")?.toString()

    // Server-side validation
    if (!email || !password) {
        throw new Error("Email and password are required.")
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
        throw new Error("Invalid email or password.")
    }

    // we now have a successful login, let's grab the token and set it in a cookie
    const { token } = await response.json()

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
