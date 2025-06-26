"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowUpAZ, ArrowDownAZ, ArrowDownWideNarrow } from "lucide-react";
import { useRouter } from "next/navigation";

interface FilterProps {
  sort?: string;
  category: string;
}

const Filter = ({ sort, category }: FilterProps) => {
  const router = useRouter();

  const handleSubmit = (event: string, category: string) => {
    const selectedValue = event;

    router.push(`/vendors?category=${category}&sort=${selectedValue}`, {
      //@ts-ignore
      shallow: true,
    });
  };
  return (
    <Select
      value={sort}
      onValueChange={(event) => handleSubmit(event, category)}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-likes">
          <p className="flex flex-row gap-3">
            <span>
              <ArrowDownWideNarrow className="w-5 h-5" />
            </span>
            Most Popular
          </p>
        </SelectItem>
        <SelectItem value="name">
          <p className="flex flex-row gap-3">
            <span>
              <ArrowDownAZ className="w-5 h-5" />
            </span>
            Ascending
          </p>
        </SelectItem>
        <SelectItem value="-name">
          <p className="flex flex-row gap-3">
            <span>
              <ArrowUpAZ className="w-5 h-5" />
            </span>
            Descending
          </p>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Filter;
