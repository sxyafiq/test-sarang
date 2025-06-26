"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Vendor } from "@/payload-types";

interface FeaturedImageProps {
  category: string;
}

const FeaturedImage = ({ category }: FeaturedImageProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  const top = results.data?.top as Vendor;
  return (
    <>
      {top ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {top.images[1] ? (
                <Image
                  width={197}
                  height={197}
                  //@ts-ignore
                  src={top.images[1].image.sizes?.thumbnail?.url}
                  alt="product category image"
                  className="aspect-square rounded-2xl object-cover object-center"
                />
              ) : (
                <Image
                  width={197}
                  height={197}
                  //@ts-ignore
                  src={top.images[0].image.sizes?.thumbnail?.url}
                  alt="product category image"
                  className="aspect-square rounded-2xl object-cover object-center"
                />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{top.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="bg-slate-200 animate-pulse w-full h-full aspect-square rounded-2xl"></div>
      )}
    </>
  );
};

export default FeaturedImage;
