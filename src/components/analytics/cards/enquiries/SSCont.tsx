"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { FolderHeart } from "lucide-react";
import SSDataPull from "./SSDataPull";

interface SSContProps {
  userId: string;
}

const SSCont = ({ userId }: SSContProps) => {
  const getVendorId = trpc.getVendorId.useQuery({
    userId: userId,
  });

  const vendorId = getVendorId.data?.docs[0].id;
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
        <CardTitle className="text-sm font-medium">
          Sarang Sayang Enquiries
        </CardTitle>
        <FolderHeart />
      </CardHeader>
      <CardContent>
        {vendorId ? <SSDataPull vendorId={vendorId} /> : null}
      </CardContent>
    </>
  );
};

export default SSCont;
