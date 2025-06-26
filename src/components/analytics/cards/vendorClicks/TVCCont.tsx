"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointerClick } from "lucide-react";
import TVCDataPull from "./TVCDataPull";

interface TVCContProps {
  vendorId: string;
  blank?: boolean;
}

const TVCCont = ({ vendorId, blank }: TVCContProps) => {
  return (
    <>
      {blank ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
            <CardTitle className="text-sm font-medium">
              Total Page Visits
            </CardTitle>
            <MousePointerClick />
          </CardHeader>
          <CardContent>
            {/* {vendorId ? <TVCDataPull vendorId={vendorId} /> : null} */}
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
            <CardTitle className="text-sm font-medium">
              Total Page Visits
            </CardTitle>
            <MousePointerClick />
          </CardHeader>
          <CardContent>
            {vendorId ? <TVCDataPull vendorId={vendorId} /> : null}
          </CardContent>
        </>
      )}
    </>
  );
};

export default TVCCont;
