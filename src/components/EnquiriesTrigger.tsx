import { FolderSearch } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Chat } from "@/payload-types";

interface EnquiriesTriggerProps {
  unread: number;
}

const EnquiriesTrigger = ({ unread }: EnquiriesTriggerProps) => {
  const iconColor =
    unread > 0
      ? "text-rose-500 group-hover:text-rose-600"
      : "text-blue-400 group-hover:text-blue-500";

  return (
    <FolderSearch
      aria-hidden="true"
      className={cn("h-6 w-6 flex-shrink-0", iconColor)}
    />
  );
};

export default EnquiriesTrigger;
