// Next
import type { Metadata } from "next";

//Components
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

// Constants
import { HTML_TITLE_PREFIX } from "@/constants"

export const metadata: Metadata = {
  title: `${HTML_TITLE_PREFIX} | Settings`,
}

// Todo: implement the getUser query
// add mores fields to the user data - User name, phone number, profile picture?

const user = {}

export default function SettingsPage() {
  return (
    <div className="px-4 lg:px-6 space-y-4">
      <h1>Settings</h1>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Card Header</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Card footer
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}