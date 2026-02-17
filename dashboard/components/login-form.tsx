'use client'

// React
import { useActionState } from "react"

// Constants
import { ROUTES } from "@/constants"

// Components
import { SubmitButton } from "@/components/buttons/SubmitButton"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Utils
import { cn } from "@/lib/utils"

type LoginState = {
  error?: string
}

type Props = {
  className?: string
  action: (prevState: LoginState, formData: FormData) => Promise<LoginState>
}

export function LoginForm({
  className,
  action,
  ...props
}: Props) {

  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    action,
    {}
  )

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h1 className="text-2xl font-bold text-center">Welcome to your Dashboard</h1>
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                />
              </Field>

              {state?.error && (
                <p className="text-sm text-red-500 text-center">
                  {state.error}
                </p>
              )}

              <Field>
                <SubmitButton pending={pending} />
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href={ROUTES.SIGNUP}>Sign up</a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        <a href="#">Terms of Service</a> <a href="#">Privacy Policy</a><br />© 2026 Diamond
      </FieldDescription>
    </div>
  )
}
