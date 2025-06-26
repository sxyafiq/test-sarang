"use client";

import { User, Vendor } from "@/payload-types";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { VENDOR_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import Badge from "./Badge";
import LikeButton from "./LikeButton";
import { Heart } from "lucide-react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface VendorBannerCardProps {
  vendor: Vendor;
  user?: string;
}

const VendorBannerCard = ({ vendor, user }: VendorBannerCardProps) => {
  const addClick = trpc.addClick.useMutation();

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === vendor.category
  )?.label;

  const validUrls = vendor.images
    ? (vendor.images
        .map(({ image }) =>
          typeof image === "string" ? image : image.sizes?.thumbnail?.url
        )
        .filter(Boolean) as string[])
    : [];

  return (
    <div className="w-full min-h-[250px] md:min-h-[500px] lg:min-h-[350px] bg-white p-6 rounded-lg shadow-md">
      <div>
        <div
          className="flex flex-col w-full"
          onClick={() => {
            addClick.mutate({
              vendorId: vendor.id,
            });
          }}
        >
          <Link
            href={`/vendor/${vendor.id}`}
            target="_blank"
            className="h-full w-full cursor-pointer"
          >
            <ImageSlider urls={validUrls} />
            <div className="h-full flex-row content-center mt-2">
              <h3 className="font-medium text-sm text-gray-700">
                {vendor.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{label}</p>
              <div className="mt-1">
                {user ? (
                  <LikeButton vendor={vendor} user={user} />
                ) : (
                  <Heart
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "You gotta sign in first",
                        variant: "destructive",
                        action: (
                          <Button
                            asChild
                            variant="outline"
                            className="text-slate-900"
                          >
                            <Link href={"/sign-in"}>Sign in!</Link>
                          </Button>
                        ),
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorBannerCard;
