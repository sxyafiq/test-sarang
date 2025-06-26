import { Lead } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import React from "react";

interface TEDataPullProps {
  vendorId: string;
}

const TEDataPull = ({ vendorId }: TEDataPullProps) => {
  const getLeads = trpc.getLeads.useQuery({
    vendorId: vendorId,
    high: true,
    medium: true,
    low: true,
    cs: true,
    ni: true,
    lnr: true,
    cold: true,
    hot: true,
    warm: true,
    nc: true,
  });

  const leads = getLeads.data as unknown as Lead[];

  return (
    <>
      {leads ? (
        <div className="text-2xl font-bold">{leads.length}</div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </>
  );
};

export default TEDataPull;
