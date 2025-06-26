"use client";

import { Chat, User, Vendor } from "@/payload-types";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { trpc } from "@/trpc/client";
import { sendMessageUpdateFromVendor } from "@/actions/snedMessageUpdateFromVendor";

interface ChatInputProps {
  user: User;
  chat: Chat;
  vendorName: string;
}

const ChatInput = ({ user, chat, vendorName }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const add = trpc.addMessage.useMutation();

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
                from: "vendor",
                message: input,
              });
              sendMessageUpdateFromVendor({
                message: input,
                userEmail: user.email,
                userName: user.name,
                vendorName: vendorName,
              });
              setInput("");
            }
          }}
          placeholder={`Message ${user.email}`}
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
              onClick={() => {
                add.mutate({
                  chatId: chat.id,
                  from: "vendor",
                  message: input,
                });
                sendMessageUpdateFromVendor({
                  message: input,
                  userEmail: user.email,
                  userName: user.name,
                  vendorName: vendorName,
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
