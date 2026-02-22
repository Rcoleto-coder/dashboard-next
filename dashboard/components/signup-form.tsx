'use client'

//  React
import { useActionState } from "react"

//  Constants
import { ROUTES } from "@/constants"

// Components
import { CreateAccountButton } from "@/components/buttons/CreateAccountButton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type SignupState = {
  error?: string
}

type Props = {
  action: (prevState: SignupState, formData: FormData) => Promise<SignupState>
} & React.ComponentProps<typeof Card>

export function SignupForm({ action, ...props }: Props) {

  const [state, formAction, pending] = useActionState<SignupState, FormData>(
    action,
    {}
  )

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            {/* <Field>
              // Let's use only email for now
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
                id="name" 
                name="full_name" 
                type="text" 
                placeholder="Enter your name here" 
                required 
              />
            </Field> */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password"
                name="password"
                type="password"
                required
              />
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input 
                id="confirm-password"
                name="confirm_password"
                type="password"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            {state?.error && (
              <p className="text-sm text-red-500 text-center">
                {state.error}
              </p>
            )}
            <FieldGroup>
              <Field>
                <CreateAccountButton pending={pending} />
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href={ROUTES.LOGIN}>Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
