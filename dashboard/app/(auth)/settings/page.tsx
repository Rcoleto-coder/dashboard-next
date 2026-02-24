// Next
import type { Metadata } from "next";

// Constants
import { HTML_TITLE_PREFIX } from "@/constants"

export const metadata: Metadata = {
  title: `${HTML_TITLE_PREFIX} | Settings`,
}

export default function SettingsPage() {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )

}