"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { trpc } from "@/trpc/client";
import { Vendor } from "@/payload-types";

interface LikeBookCatProps {
  category: string;
  label: string;
}

const LikeBookCat = ({ category, label }: LikeBookCatProps) => {
  const {
    data: getAllVendorLikes,
    isLoading,
    status,
  } = trpc.getAllVendorLikes.useQuery({
    category: category,
  });

  return (
    <MaxWidthWrapper className="border-2 shadow-md p-10">
      <h2 className="text-xl font-bold tracking-tight">Top {label}</h2>
      {!isLoading ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead className="w-[700px]">Vendor Name</TableHead>
                <TableHead className="w-[200px]">Claim Status</TableHead>
                <TableHead className="w-[50px]">Clicks</TableHead>
                <TableHead className="w-[50px]">Enquiries</TableHead>
                <TableHead className="w-[50px]">Replies</TableHead>
                <TableHead className="w-[50px]">Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAllVendorLikes?.map((vendor: Vendor, i) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-semibold">{vendor.name}</TableCell>
                  <TableCell>
                    {/* @ts-ignore */}
                    {vendor.venduserid.id === "658fdba885aa3665781e567a" ? (
                      <p className="p-5 bg-amber-200 rounded-md shadow-md w-full text-slate-500">
                        Not Claimed
                      </p>
                    ) : (
                      <p className="p-5 bg-sky-200 rounded-md shadow-md w-full text-slate-500">
                        Claimed
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {vendor.clicks ? vendor.clicks : 0}
                  </TableCell>
                  {/* @ts-ignore */}
                  {!vendor.replies && vendor.enquiries ? (
                    <TableCell className="text-center text-red-500 font-extrabold">
                      {/* @ts-ignore */}
                      {vendor.enquiries ? vendor.enquiries : 0}
                    </TableCell>
                  ) : (
                    <TableCell className="text-center">
                      {/* @ts-ignore */}
                      {vendor.enquiries ? vendor.enquiries : 0}
                    </TableCell>
                  )}
                  <TableCell className="text-center">
                    {/* @ts-ignore */}
                    {vendor.replies ? vendor.replies : 0}
                  </TableCell>
                  {/* @ts-ignore */}
                  <TableCell className="text-center">{vendor.likes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Table>
          <TableCaption className="animate-bounce">{status} la..</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Position</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead className="w-[200px]">Claim Status</TableHead>
              <TableHead className="w-[50px]">Clicks</TableHead>
              <TableHead className="w-[50px]">Enquiries</TableHead>
              <TableHead className="w-[50px]">Replies</TableHead>
              <TableHead className="w-[50px]">Likes</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      )}
    </MaxWidthWrapper>
  );
};

export default LikeBookCat;
