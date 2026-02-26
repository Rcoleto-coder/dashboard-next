
// Next JS
import type { Metadata } from "next"

// Constants
import { HTML_TITLE_PREFIX } from "@/constants"

// Components
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

// Data
import data from "./dashboard/data.json"


// Read the html title from the layout
export const metadata : Metadata = {
  title: `${HTML_TITLE_PREFIX}`,
}

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  )
}
