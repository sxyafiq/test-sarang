"use client";

import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import React from "react";
import CRMEditLead from "./CRMEditLead";
import { Lead } from "@/payload-types";

interface CRMSheetContProps {
  id: string;
}

const CRMSheetCont = ({ id }: CRMSheetContProps) => {
  const getLead = trpc.getLead.useQuery({
    id: id,
  });

  if (getLead.status === "loading") {
    return <Loader2 className="animate-spin" />;
  } else if (getLead.status === "success" && getLead.data) {
    return <CRMEditLead lead={getLead.data.docs[0] as unknown as Lead} />;
  }
};

export default CRMSheetCont;
