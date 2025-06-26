import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import React from "react";

interface TEDataPullProps {
  vendorId: string;
}

const TEDataPull = ({ vendorId }: TEDataPullProps) => {
  const getLeads = trpc.getSSLeads.useQuery({
    vendorId: vendorId,
  });

  const leads = getLeads.data?.docs;

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
