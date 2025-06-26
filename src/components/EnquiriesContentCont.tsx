"use client";

import EnquiriesTrigger from "./EnquiriesTrigger";
import EnquiriesDataPull from "./EnquiriesDataPull";
import { trpc } from "@/trpc/client";
import { SheetContent, SheetTrigger } from "./ui/sheet";
import { Chat } from "@/payload-types";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface EnquiriesContentContProps {
  vendorId: string;
  role: string;
}

const EnquiriesContentCont = ({
  vendorId,
  role,
}: EnquiriesContentContProps) => {
  const vendorChats = trpc.getVendorChats.useQuery({
    vendorId: vendorId,
  });

  const results = vendorChats.data?.docs as Chat[];

  const allUnread = trpc.getAllUnread.useQuery({
    vendorId: vendorId,
  });

  const unread = allUnread.data || 0;

  return (
    <>
      <SheetTrigger className="group flex items-center">
        {results ? (
          <EnquiriesTrigger unread={unread} />
        ) : (
          <Loader2 className="animate-spin text-blue-400" />
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-2 sm:max-w-lg bg-gradient-to-b from-cyan-100 to-white">
        {results ? (
          <EnquiriesDataPull
            chats={results}
            itemCount={results.length}
            role={role}
          />
        ) : null}
        {role === "vendor" ? (
          <Button
            asChild
            className="bg-yellow-300 hover:bg-yellow-400 text-black"
          >
            <Link href="/status">Upgrade to View Chat Enquiries</Link>
          </Button>
        ) : null}
      </SheetContent>
    </>
  );
};

export default EnquiriesContentCont;
