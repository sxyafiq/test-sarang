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

const LeadTracker = () => {
  const {
    data: getAllVendorEnq,
    isLoading,
    status,
  } = trpc.getAllVendorEnq.useQuery();

  const byPass = true;

  return (
    <>
      {isLoading ? (
        <div className="animate-bounce w-full flex justify-center items-center">
          <p className="bg-red-300 p-8 rounded-full font-bold shadow-md">
            LOADING BRUV
          </p>
        </div>
      ) : (
        <MaxWidthWrapper>
          {/* <p>{JSON.stringify(getAllVendorEnq)}</p> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Vendor Category</TableHead>
                <TableHead>Chats Opened</TableHead>
                <TableHead>Queries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAllVendorEnq?.map((vendor, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{vendor.vendor as string}</TableCell>
                  <TableCell>{vendor.cat as string}</TableCell>
                  <TableCell>{vendor.chat}</TableCell>
                  <TableCell>{vendor.queries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MaxWidthWrapper>
      )}
    </>
  );
};

export default LeadTracker;
