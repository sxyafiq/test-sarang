"use client";

import { Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import React from "react";
import SliderVendor from "./SliderVendor";

const PopularSlider = () => {
  const { data: vendors } = trpc.getSlotVendor.useQuery();

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

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
    const list = vendors[0];
    return (
      <div className="w-full h-[300px] bg-black shadow-lg">
        <div className="overflow-x-hidden flex">
          {numbers.map((n) => (
            <div
              key={n}
              className="w-[400px] h-[300px] flex-1 transition-all duration-200 hover:flex-none opacity-55 hover:opacity-100"
            >
              {/* @ts-ignore */}
              <SliderVendor vendor={whichSlot(n, list) as Vendor} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!vendors) {
    return <h1>Loading</h1>;
  }
};

export default PopularSlider;
