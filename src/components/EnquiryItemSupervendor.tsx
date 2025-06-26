"use client";

import { Chat, User } from "@/payload-types";
import React from "react";
import { Label } from "./ui/label";
import { trpc } from "@/trpc/client";
import VendorChat from "./chat/VendorChat";

interface ChatItemProps {
  chat: Chat;
  user: User;
}

const EnquiryItemSupervendor = ({ chat, user }: ChatItemProps) => {
  const unread = trpc.getUnread.useQuery({
    chatId: chat.id,
  });

  return (
    <>
      <div className="space-y-3 py-2">
        <div className="w-full flex flex-row items-center justify-between">
          <div>
            {/* <Label className="font-bold text-xs">Name</Label>
            <Label className="font-bold text-xs">Email</Label> */}
            <h1 className="font-bold">{user.name}</h1>
            <p className="text-xs">{user.email}</p>
          </div>
          <div>
            <VendorChat chat={chat} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryItemSupervendor;
