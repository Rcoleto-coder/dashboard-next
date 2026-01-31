import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

type Props = {
  pending?: boolean
}

export function SubmitButton({ pending }: Props) {
  const { pending: formPending } = useFormStatus()

  const isPending = pending || formPending

  return (
    <Button className="cursor-pointer" type="submit" disabled={isPending}>
      {isPending ? "Logging in..." : "Login"}
    </Button>
  )
}