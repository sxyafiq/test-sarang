"use client";

import { Chat } from "@/payload-types";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { trpc } from "@/trpc/client";
import { Label } from "./ui/label";

interface ChatItemProps {
  chat: Chat;
}

const EnquiryItem = ({ chat }: ChatItemProps) => {
  const unread = trpc.getUnread.useQuery({
    chatId: chat.id,
  });

  const results = unread.data;
  return (
    <div className="space-y-3 py-2">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[140px] h-[20px]" />
          <Skeleton className="w-[200px] h-[15px]" />
        </div>
        <div>
          {/* @ts-ignore */}
          {results && results > 0 ? (
            <Button disabled className="bg-red-400">
              <MessageCircle className="mr-2 h-4 w-4" />{" "}
              {results + " Unread Messages"}
            </Button>
          ) : (
            <Button disabled className="bg-blue-400">
              <MessageCircle className="mr-2 h-4 w-4" /> {"0 Unread Messages"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryItem;
