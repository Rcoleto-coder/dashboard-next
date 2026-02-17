// Next.js
import { Metadata } from "next"

// Components
import { SignupForm } from "@/components/signup-form"
// Constants
import { HTML_TITLE_PREFIX } from "@/constants"

export const metadata: Metadata = {
  title: `${HTML_TITLE_PREFIX} | Signup`,
}

const SignupPage = () => {
  return (
    <main id="main" className="flex flex-col gap-4 min-h-svh w-full items-center justify-center p-6 md:p-10">
        <h1 className="sr-only">Signup</h1>
        <div className="w-full max-w-sm">
            <SignupForm />
        </div>
   </main>
  )
}

export default SignupPage