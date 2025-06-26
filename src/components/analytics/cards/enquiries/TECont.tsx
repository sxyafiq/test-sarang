"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { FolderSearch } from "lucide-react";
import TEDataPull from "./TEDataPull";

interface TEContProps {
  vendorId: string;
  blank?: boolean;
}

const TECont = ({ vendorId, blank }: TEContProps) => {
  return (
    <>
      {blank ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
            <CardTitle className="text-sm font-medium">
              Total Enquiries
            </CardTitle>
            <FolderSearch />
          </CardHeader>
          <CardContent>
            {/* {vendorId ? <TEDataPull vendorId={vendorId as string} /> : null} */}
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
            <CardTitle className="text-sm font-medium">
              Total Enquiries
            </CardTitle>
            <FolderSearch />
          </CardHeader>
          <CardContent>
            {vendorId ? <TEDataPull vendorId={vendorId as string} /> : null}
          </CardContent>
        </>
      )}
    </>
  );
};

export default TECont;
