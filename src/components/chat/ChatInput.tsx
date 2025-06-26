"use client";

import { Chat, User, Vendor } from "@/payload-types";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { trpc } from "@/trpc/client";
import { sendMessageUpdateFromUser } from "@/actions/sendMessageUpdateFromUser";

interface ChatInputProps {
  vendor: Vendor;
  chat: Chat;
  userName: string;
}

interface EmailProps {
  userName: string;
  vendorEmail: string;
  vendorName: string;
}

const ChatInput = ({ vendor, chat, userName }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const vendorUser = vendor.venduserid as User;

  const add = trpc.addMessage.useMutation();

  const autoReply = (vendorUser: User) => {
    if (vendorUser.email === "sales@sarangsayang.com") {
      add.mutate({
        chatId: chat.id,
        from: "vendor",
        message:
          "This vendor has not claimed their profile, please expect a delay in their response. If you need their response urgently, reach out to them directly and let them know you found them through sarangsayang.com 🩵",
      });
    } else if (vendorUser.role === "vendor") {
      add.mutate({
        chatId: chat.id,
        from: "vendor",
        message:
          "This vendor might take a while to reply you! If you need their response urgently, reach out to them directly and let them know you found them through sarangsayang.com 🩵",
      });
    }
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0 flex flex-row items-center">
      <div className="w-full overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize
          value={input}
          onChange={(e) => handleInput(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              add.mutate({
                chatId: chat.id,
                from: "user",
                message: input,
              });
              autoReply(vendorUser);
              sendMessageUpdateFromUser({
                userName: userName,
                vendorEmail: vendorUser.email,
                vendorName: vendor.name,
              });
              setInput("");
            }
          }}
          placeholder={`Message ${vendor.name}`}
          className="p-6 block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="flex justify-between py-2 pl-3 pr-2">
        <div className="flex-shrin-0">
          {input === "" ? (
            <Button disabled className="rounded-full bg-slate-500">
              <ArrowUp className="h-3 w-3" />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                add.mutate({
                  chatId: chat.id,
                  from: "user",
                  message: input,
                });
                autoReply(vendorUser);
                sendMessageUpdateFromUser({
                  userName: userName,
                  vendorEmail: vendorUser.email,
                  vendorName: vendor.name,
                });
                setInput("");
              }}
              className="rounded-full bg-blue-500"
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
