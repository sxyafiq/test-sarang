"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { BookHeart } from "lucide-react";
import TVLDataPull from "./TVLDataPull";
import { Vendor } from "@/payload-types";

interface TotalVendorLikesProps {
  vendorId: string;
  role: string;
  blank?: boolean;
}

const TotalVendorLikes = ({ vendorId, blank, role }: TotalVendorLikesProps) => {
  const vendor = trpc.getVendor.useQuery({
    id: vendorId,
  });

  return (
    <>
      {blank ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
            <CardTitle className="text-sm font-medium">
              Total Vendor Likes
            </CardTitle>
            <BookHeart />
          </CardHeader>
          <CardContent>
            {/* {vendorId ? <TVLDataPull vendor={vendorId} /> : null} */}
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
            <CardTitle className="text-sm font-medium">
              Total Vendor Likes
            </CardTitle>
            <BookHeart />
          </CardHeader>
          <CardContent>
            {vendor && vendor.data ? (
              // @ts-ignore
              <TVLDataPull vendor={vendor.data.docs[0]} role={role} />
            ) : // <p>{JSON.stringify(vendor.data.docs[0].name)}</p>
            null}
          </CardContent>
        </>
      )}
    </>
  );
};

export default TotalVendorLikes;
