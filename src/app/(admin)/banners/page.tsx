"use client";

import BridalBanner from "@/components/BridalBanner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PopularSlider from "@/components/PopularSlider";
import ProductReel from "@/components/ProductReel";
import { Button } from "@/components/ui/button";
import VendorBanner from "@/components/VendorBanner";
import { trpc } from "@/trpc/client";
import Link from "next/link";

const Banners = () => {
  return (
    <div className="mt-10 flex flex-row gap-3">
      <div className="flex-1 border border-3 py-3">
        <MaxWidthWrapper>
          <h1 className="text-3xl mb-3 font-bold tracking-tight">Top Vendor</h1>
        </MaxWidthWrapper>
        <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5 mb-10">
          <MaxWidthWrapper>
            <Link href={"/vendor/65a07bbf9cd6475e4b367c27"} target="_blank">
              <div className="bg-[url('/flyer.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
                <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white/75 rounded-2xl m-5">
                  <div className="flex flex-row items-center gap-1">
                    <h1 className="text-base md:text-lg font-bold">
                      Singapore Flyer
                    </h1>
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm">
                    Check out Singapore Flyers Event Hall&apos;s vendor profile
                    & enquire for your wedding venue today.
                  </p>
                </div>
              </div>
            </Link>
          </MaxWidthWrapper>
        </div>
        <MaxWidthWrapper>
          <ProductReel
            title={""}
            query={{
              category: "venues",
              limit: 8,
            }}
          />
        </MaxWidthWrapper>
      </div>
      <div className="flex-1 border border-3 py-3">
        <MaxWidthWrapper>
          <h1 className="text-3xl mb-3 font-bold tracking-tight">
            Featured Vendor
          </h1>
        </MaxWidthWrapper>
        <VendorBanner cat={"bridals"} noTitle />
        <MaxWidthWrapper>
          <ProductReel
            title={""}
            query={{
              category: "bridals",
              limit: 8,
            }}
          />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Banners;
