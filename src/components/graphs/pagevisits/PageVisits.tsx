import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PageVisitsProps {
  vendorId: string
}

const PageVisits = ({vendorId}: PageVisitsProps) => {
  return (
    <>
      <CardHeader>
          <CardTitle>Page Visits</CardTitle>
          <CardDescription>
          Your vendor collected 265 page visits this month.
          </CardDescription>
      </CardHeader>
      <CardContent>
          
      </CardContent>
    </>
  )
}

export default PageVisits