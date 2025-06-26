"use client";

import { Chat, Message } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { format } from "date-fns";
import { useRef, useEffect } from "react";

interface MessagesProps {
  chat: Chat;
}

const Messages = ({ chat }: MessagesProps) => {
  const messages = trpc.getMessages.useQuery({
    chatId: chat.id,
  });

  const results = messages.data?.docs as Message[];

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // @ts-ignore
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [results]);

  return (
    <div
      ref={containerRef}
      className="flex h-[400px] flex-1 flex-col gap-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {results ? (
        results.map((message) =>
          message.from === "user" ? (
            <div className="flex items-end justify-end" key={message.id}>
              <div className="flex flex-col space-y-2 text-base max-w-md mx-2 order-1 items-end">
                <p className="px-4 py-2 rounded-lg inline-block bg-indigo-600 text-white">
                  {message.message}
                  <span className="ml-2 text-xs text-gray-400">
                    {format(message.createdAt, "EEEE") + ","}
                  </span>
                  <span className="ml-1 text-xs text-gray-400">
                    {format(message.createdAt, "HH:mm")}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-end justify-start" key={message.id}>
              <div className="flex flex-col space-y-2 text-base max-w-md mx-2 order-2 items-start">
                <p className="px-4 py-2 rounded-lg inline-block bg-green-400 text-white">
                  {message.message}
                  <span className="ml-2 text-xs text-gray-500">
                    {format(message.createdAt, "EEEE") + ","}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">
                    {format(message.createdAt, "HH:mm")}
                  </span>
                </p>
              </div>
            </div>
          )
        )
      ) : (
        <div>
          <h1 className="text-center">Chat Started</h1>
        </div>
      )}
    </div>
  );
};

export default Messages;
