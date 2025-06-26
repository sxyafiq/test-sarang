"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { BadgeCheck } from "lucide-react";
import { trpc } from "@/trpc/client";
import { Vendor } from "@/payload-types";
import ImageSlider from "./ImageSlider";
import Badge from "./Badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import VendorBannerCard from "./VendorBannerCard";
import { VENDOR_CATEGORIES } from "@/config";

interface VendorBannerProps {
  cat: string;
  user?: string;
  noTitle?: boolean;
}

const VendorBanner = ({ cat, user, noTitle }: VendorBannerProps) => {
  const addClick = trpc.addClick.useMutation();

  const results = trpc.getTopVendor.useQuery({
    category: cat,
  });

  const label = VENDOR_CATEGORIES.find(({ value }) => value === cat)?.label;

  const top4 = results.data?.top4 as unknown;

  return (
    <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-md p-5">
      {!noTitle ? (
        <MaxWidthWrapper className="pb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Featured {label}
          </h1>
        </MaxWidthWrapper>
      ) : null}
      <MaxWidthWrapper className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="w-full col-span-3">
          {cat == "venues" ? (
            <>
              <div
                onClick={() => {
                  addClick.mutate({
                    vendorId: "677b9be524ae4fe86eef292e",
                  });
                }}
              >
                <Link href={"/vendor/677b9be524ae4fe86eef292e"} target="_blank">
                  <div className="bg-[url('/flyer.png')] bg-cover bg-center relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
                    <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white/75 rounded-2xl m-5">
                      <div className="flex flex-row items-center gap-1">
                        <h1 className="text-base md:text-lg font-bold">
                          Singapore Flyer Grand Ballroom
                        </h1>
                        {/* <BadgeCheck
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-yellow-400"
                        /> */}
                      </div>
                      <p className="text-slate-500 text-xs md:text-sm">
                        Check out Singapore Flyers Event Hall&apos;s vendor
                        profile & enquire for your wedding venue today.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full col-span-1">
          {results.data && top4 ? (
            <div>
              {/* @ts-ignore */}
              <VendorBannerCard vendor={top4[1].vendor as Vendor} />
              {/* @ts-ignore */}
              {/* <VendorBannerCard vendor={top4[2].vendor as Vendor} /> */}
              {/* <p>{JSON.stringify(top4[1].vendor as Vendor)}</p>
              <p>{JSON.stringify(top4[2].vendor as Vendor)}</p> */}
            </div>
          ) : (
            <></>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default VendorBanner;
