'use server'

import { redirect } from "next/navigation"

import { ROUTES } from "@/constants"
import { isValidEmail, isValidPassword } from "@/actions/utils"

type SignupState = {
    error?: string
}

export async function SignupAction(prevState: SignupState, formData: FormData): Promise<SignupState> {
    // Let's grab the form data
    const email = formData.get("email")?.toString().trim().toLowerCase()
    const password = formData.get("password")?.toString()
    const confirm_password = formData.get("confirm_password")?.toString()

    if (!email || !password || !confirm_password) {
        return { error: "Email and password are required." }
    }

    if (password !== confirm_password) {
        return { error: "Passwords do not match." }
    }

    // Server-side validation
    // The API also enforces email and password validation
    if (!isValidEmail(email)) {
        return { error: "Invalid email address." }
    }

    if (!isValidPassword(password)) {
        return { error: "Password must be at least 6 characters long." }
    }

    // The signup endpoint is called register no the backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
    })

    if (!response.ok) {
        const message = await response.text()
        try {
            const data = JSON.parse(message)
            return { error: data.message ?? data.error ?? "Signup failed." }
        } catch {
            return { error: "Signup failed. Please try again." }
        }
    }

    redirect(ROUTES.LOGIN)
}