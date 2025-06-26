"use client";

import React from "react";
import { ScanSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchProps {
  search?: string;
  category: string;
}

const Search = ({ search, category }: SearchProps) => {
  const router = useRouter();

  const handleSearch = (event: { target: { value: string } }) => {
    const search = event.target.value;

    router.push(`/vendors?category=${category}&search=${search}`, {
      //@ts-ignore
      shallow: true,
    });
  };
  return (
    <Input
      className="w-[300px]"
      placeholder="Search by name"
      onChange={handleSearch}
    />
  );
};

export default Search;
