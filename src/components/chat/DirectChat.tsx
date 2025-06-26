"use client";

import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Image from "next/image";
import { Chat, User, Vendor } from "@/payload-types";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { trpc } from "@/trpc/client";
import Badge from "../Badge";
import { cn } from "@/lib/utils";

interface DirectChatProps {
  vendor: Vendor;
  user: User;
  image: string;
  label?: string;
  unread?: number;
}

const DirectChat = ({
  vendor,
  user,
  image,
  label,
  unread,
}: DirectChatProps) => {
  const chat = trpc.getChat.useQuery({
    userId: user.id,
    vendorId: vendor.id,
  });

  const identifiedChat = chat.data?.docs[0] as unknown as Chat;

  const createChat = trpc.createChat.useMutation();

  const read = trpc.userRead.useMutation();

  return (
    <Drawer>
      <DrawerTrigger>
        {identifiedChat ? (
          <Button
            className={cn(
              unread && unread > 0 ? "bg-red-500 hover:bg-red-400" : null
            )}
            onClick={() =>
              read.mutate({
                chatId: identifiedChat.id,
              })
            }
          >
            <MessageCircle className="mr-2 h-4 w-4" /> {label}
          </Button>
        ) : (
          <Button
            onClick={() =>
              createChat.mutate({
                userId: user.id,
                vendorId: vendor.id,
              })
            }
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Chat Now
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="py-2">
        <MaxWidthWrapper>
          <DrawerHeader>
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <div className="relative w-8 sm:w-12 h-8 sm:h-12">
                    <Image
                      fill
                      referrerPolicy="no-referrer"
                      src={image}
                      alt={`${vendor} profile picture`}
                      className="rounded-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col leading-tight">
                  <div className="text-xl flex items-center">
                    <h1 className="text-gray-700 mr-3 font-semibold flex items-center gap-2">
                      {vendor.name}
                      <span>
                        {/* @ts-ignore */}
                        <Badge vendorRole={vendor.venduserid.role} />
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </DrawerHeader>
          {identifiedChat ? (
            <Messages chat={identifiedChat} />
          ) : (
            <div className="flex h-[400px] flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              <div>
                <h1 className="text-center">Chat Not Found</h1>
              </div>
            </div>
          )}

          <DrawerFooter className="h-full">
            <ChatInput
              vendor={vendor}
              chat={identifiedChat}
              userName={user.name}
            />
          </DrawerFooter>
        </MaxWidthWrapper>
      </DrawerContent>
    </Drawer>
  );
};

export default DirectChat;
