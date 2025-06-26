"use client";

import VendorChat from "@/components/chat/VendorChat";
import { Button } from "@/components/ui/button";
import { Chat, User, Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import React from "react";

interface TVLChatProps {
  user: User;
  vendor: Vendor;
}

const TVLChat = ({ user, vendor }: TVLChatProps) => {
  const chat = trpc.checkChat.useQuery({
    userId: user.id,
    vendorId: vendor.id,
  });

  const createChat = trpc.createChat.useMutation();

  if (chat.isFetched && chat.data && chat.data.length > 0)
    return (
      <>
        {/* @ts-ignore */}
        <VendorChat chat={chat.data[0] as Chat} user={user} />
      </>
    );

  if (chat.isFetched && chat.data && chat.data?.length == 0)
    return (
      <>
        {/* @ts-ignore */}
        {user.id != vendor.venduserid.id ? (
          <>
            <Button
              className="w-[200px]"
              variant={"secondary"}
              onClick={() =>
                createChat.mutate({
                  userId: user.id,
                  vendorId: vendor.id,
                })
              }
            >
              Start Chat
            </Button>
          </>
        ) : (
          <Button className="w-[200px]" variant={"outline"} disabled>
            <p className="flex justify-center items-center gap-3">Disabled</p>
          </Button>
        )}
      </>
    );

  if (chat.isLoading)
    return (
      <Button className="w-[200px]" variant={"outline"} disabled>
        <p className="flex justify-center items-center gap-3">
          Loading{" "}
          <span>
            <Loader2 size={10} className="animate-spin" />
          </span>
        </p>
      </Button>
    );
};

export default TVLChat;
