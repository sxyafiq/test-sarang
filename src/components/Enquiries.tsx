"use client";

import { User } from "@/payload-types";
import { Sheet } from "./ui/sheet";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import EnquiriesContentCont from "./EnquiriesContentCont";

const Enquiries = ({ user }: { user: User }) => {
  const vendor = trpc.getVendorId.useQuery({
    userId: user.id,
  }).data;

  return (
    <Sheet>
      {vendor ? (
        <EnquiriesContentCont vendorId={vendor.docs[0].id} role={user.role} />
      ) : (
        <Loader2 className="animate-spin text-blue-400" />
      )}
    </Sheet>
  );
};

export default Enquiries;
