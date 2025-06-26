'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trpc } from "@/trpc/client"
import BarGraph from "./BarGraph"

interface VendorLikesProps {
  vendorId: string
}

const VendorLikes = ({vendorId}: VendorLikesProps) => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const currentMonthData = trpc.getVendorLikesThisMonth.useQuery({
        month: currentMonth,
        year: currentYear,
        vendorId: vendorId
    })

    const graphData = trpc.getVendorLikes12M.useQuery({
        month: currentMonth,
        year: currentYear,
        vendorId: vendorId
    })

  return (
    <>
      <CardHeader>
            <CardTitle>Vendor Likes</CardTitle>
            {currentMonthData.data ? <CardDescription>
                Your vendor collected {currentMonthData.data.docs.length} likes this month.
            </CardDescription> : null}
        </CardHeader>
        <CardContent>
          <div className="h-[500px] mt-7">
            {/* @ts-ignore */}
            {graphData.data ? <BarGraph data={graphData.data}/> : null}
          </div>
        </CardContent>
    </>
  )
}

export default VendorLikes