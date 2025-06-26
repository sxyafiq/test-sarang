"use client";

import { trpc } from "@/trpc/client";
import React from "react";
import Image from "next/image";
import { Vendor } from "@/payload-types";
import { VENDOR_CATEGORIES } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import HomepageSlotsCombobox from "./HomepageSlotsCombobox";

interface HomepageSlotsProps {
  slot: number;
}

const HomepageSlots = ({ slot }: HomepageSlotsProps) => {
  const { data: vendors } = trpc.getSlotVendor.useQuery();

  function whichSlot(
    n: number,
    object: {
      slot1: Vendor;
      slot2: Vendor;
      slot3: Vendor;
      slot4: Vendor;
      slot5: Vendor;
      slot6: Vendor;
      slot7: Vendor;
      slot8: Vendor;
    }
  ) {
    if (n == 1) {
      return object.slot1;
    } else if (n == 2) {
      return object.slot2;
    } else if (n == 3) {
      return object.slot3;
    } else if (n == 4) {
      return object.slot4;
    } else if (n == 5) {
      return object.slot5;
    } else if (n == 6) {
      return object.slot6;
    } else if (n == 7) {
      return object.slot7;
    } else if (n == 8) {
      return object.slot8;
    }
  }

  if (vendors) {
    const vendor = vendors[0];
    return (
      <div>
        <Dialog>
          <DialogTrigger>
            <Image
              width={900}
              height={900}
              src={
                //@ts-ignore
                whichSlot(slot, vendor).images[1].image.sizes?.thumbnail?.url
              }
              alt="product category image"
              className="aspect-square rounded-2xl object-cover object-center hover:opacity-50 cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Vendor</DialogTitle>
              <DialogDescription>{"Slot " + slot}</DialogDescription>
            </DialogHeader>
            <HomepageSlotsCombobox
              //@ts-ignore
              setVend={whichSlot(slot, vendor) as Vendor}
              slot={slot}
            />
          </DialogContent>
        </Dialog>
        <p className="text-sm font-semibold text-center tracking-tight leading-tight mt-3">
          {/* @ts-ignore */}
          {whichSlot(slot, vendor).name}
        </p>
        <p className="text-xs text-center capitalize">
          {/* @ts-ignore */}
          {whichSlot(slot, vendor).category}
        </p>
      </div>
    );
  } else {
    <div className="bg-slate-200 animate-pulse w-full h-full aspect-square rounded-2xl"></div>;
  }
};

export default HomepageSlots;
