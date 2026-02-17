// Next.js
import { Metadata } from "next"

// Constants
import { HTML_TITLE_PREFIX } from "@/constants"

// Actions
import { LoginAction } from "@/actions/login"

//  Components
import { LoginForm } from "@/components/login-form"

// Read the html title from the layout and add | Login
export const metadata: Metadata = {
  title: HTML_TITLE_PREFIX,
}

export default function LoginPage() {
  return (
    <main id="main" className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm action={LoginAction} />
      </div>
    </main>
  )
}
