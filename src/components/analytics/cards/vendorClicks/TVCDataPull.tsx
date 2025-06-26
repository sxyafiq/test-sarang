import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import React from "react";

interface TVCDataPullProps {
  vendorId: string;
}

const TVCDataPull = ({ vendorId }: TVCDataPullProps) => {
  const getClicks = trpc.getClicks.useQuery({
    vendorId: vendorId,
  });

  const clicks = getClicks.data;

  return (
    <>
      {getClicks.isFetched ? (
        <div className="text-2xl font-bold">{getClicks.data}</div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </>
  );
};

export default TVCDataPull;
