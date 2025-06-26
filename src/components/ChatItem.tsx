"use client";

import { VENDOR_CATEGORIES } from "@/config";
import { Chat, User, Vendor } from "@/payload-types";
import Image from "next/image";
import DirectChat from "./chat/DirectChat";
import Badge from "./Badge";
import { trpc } from "@/trpc/client";

interface ChatItemProps {
  chat: Chat;
  vendor: Vendor;
  user: User;
}

const ChatItem = ({ chat, vendor, user }: ChatItemProps) => {
  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === vendor.category
  )?.label;

  const unread = trpc.userGetUnread.useQuery({
    chatId: chat.id,
  });

  const results = unread.data;
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <Image
              // @ts-ignore
              src={vendor.images[0].image.sizes?.thumbnail?.url}
              alt={vendor.name}
              fill
              className="absolute object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2">
              <h1>{vendor.name}</h1>
              <span>
                {/* @ts-ignore */}
                <Badge vendorRole={vendor.venduserid.role} />
              </span>
            </div>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <DirectChat
            vendor={vendor}
            user={user}
            // @ts-ignore
            image={vendor.images[0].image.url}
            label={results + " Unread Messages"}
            unread={results}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
