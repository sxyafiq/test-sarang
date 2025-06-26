"use client";

import { User, Vendor } from "../payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { VENDOR_CATEGORIES } from "../config";
import ImageSlider from "./ImageSlider";
import LikeButton from "./LikeButton";
import { BadgeCheck, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Badge from "./Badge";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";

interface ProductListingProps {
  vendor: Vendor | null;
  index: number;
  user?: string;
}

const PackageListing = ({ vendor, index, user }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const addClick = trpc.addClick.useMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  const ProductPlaceholder = () => {
    return (
      <div className="flex flex-col w-full">
        <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
      </div>
    );
  };

  if (!vendor || !isVisible) return <ProductPlaceholder />;

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

  if (isVisible && vendor) {
    return (
      <div
        className={cn("invisible h-full w-full group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div
          className="flex flex-col w-full"
          onClick={() => {
            addClick.mutate({
              vendorId: vendor.id,
            });
          }}
        >
          {user ? (
            <Link
              href={`/package/${vendor.id}`}
              target="_blank"
              className={cn(
                "invisible h-full w-full cursor-pointer group/main",
                {
                  "visible animate-in fade-in-5": isVisible,
                }
              )}
            >
              <ImageSlider urls={validUrls} />
              <h3 className="flex items-center gap-2 mt-4 font-medium text-sm text-gray-700">
                {vendor.name}
              </h3>
            </Link>
          ) : (
            <Link
              href="/sign-in"
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
            >
              <ImageSlider urls={validUrls} />
              <h3 className="flex items-center gap-2 mt-4 font-medium text-sm text-gray-700">
                {vendor.name}
              </h3>
            </Link>
          )}
          <Link href={`/packages`}>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </Link>
        </div>
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
    );
  }
};

export default PackageListing;
