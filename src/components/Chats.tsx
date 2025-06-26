"use client";

import { MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Chat, User, Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import ChatItem from "./ChatItem";
import { cn } from "@/lib/utils";

const Chats = ({ user }: { user: User }) => {
  const getChats = trpc.getAllChats.useQuery({
    userId: user.id,
  });

  const chats = (getChats.data?.docs as unknown as Chat[]) || [];

  const itemCount = chats.length;

  const allUnread = trpc.userGetAllUnread.useQuery({
    userId: user.id,
  });

  const unread = allUnread.data;
  return (
    <Sheet>
      <SheetTrigger className="group flex items-center">
        <MessageCircle
          aria-hidden="true"
          className={cn(
            "h-6 w-6 flex-shrink-0",
            unread && unread > 0
              ? "text-red-400 group-hover:text-red-500"
              : "text-blue-400 group-hover:text-blue-500"
          )}
        />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-2 sm:max-w-lg bg-gradient-to-b from-cyan-100 to-white">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Chats</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex h-full flex-col py-3">
              <ScrollArea>
                {/* @ts-ignore */}
                {chats.map((chat) => (
                  <div className="px-6" key={chat.id}>
                    <ChatItem
                      chat={chat}
                      vendor={chat.vendor as Vendor}
                      user={user}
                    />
                  </div>
                ))}
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-6">
            <Image
              src="https://i.giphy.com/media/OSuaE6AknuRc7syZXp/giphy-downsized.gif"
              alt="NothingHere"
              width={480}
              height={360}
              className="px-4"
            />
            <div className="text-md font-semibold">No chats yet..</div>
            <div className="text-md font-normal">
              Start chatting with vendors!
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Chats;
