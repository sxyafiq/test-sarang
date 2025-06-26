"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import { Vendor } from "@/payload-types";
import { VENDOR_CATEGORIES } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FeaturedNavbarCombobox from "./FeaturedNavbarCombobox";
import { Button } from "../ui/button";
import Link from "next/link";

interface FeaturedImageConsoleProps {
  category: string;
}

const FeaturedImageConsole = ({ category }: FeaturedImageConsoleProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  const top = results.data?.top as Vendor;
  return (
    <>
      <div className="flex-row justify-items-center justify-center w-full h-full gap-8">
        {top ? (
          <Dialog>
            <DialogTrigger>
              {top.images[1] ? (
                <Image
                  width={900}
                  height={900}
                  //@ts-ignore
                  src={top.images[1].image.sizes?.thumbnail?.url}
                  alt="product category image"
                  className="aspect-square rounded-2xl object-cover object-center hover:opacity-50 cursor-pointer"
                />
              ) : (
                <div className="rounded-2xl bg-black/50 hover:bg-black/20 w-900 h-900 aspect-square flex justify-center items-center">
                  <p>Does not have a second photo</p>
                </div>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Vendor</DialogTitle>
                <DialogDescription>{label + " Navbar"}</DialogDescription>
              </DialogHeader>
              <FeaturedNavbarCombobox cat={category} />
              <Button variant={"outline"} asChild>
                <Link
                  target="_blank"
                  href={
                    "https://www.sarangsayang.com/backstage/collections/featured/65a3e090f66a58e7b5eb9542"
                  }
                >
                  Set Featureds at Backstage
                </Link>
              </Button>
            </DialogContent>
          </Dialog>
        ) : (
          <>
            <div className="bg-slate-200 animate-pulse w-full h-full aspect-square rounded-2xl"></div>
          </>
        )}
        {top ? (
          <p className="text-sm font-semibold text-center tracking-tight leading-tight mt-3">
            {top.name}
          </p>
        ) : null}
        {top ? <p className="text-xs text-center">{label}</p> : null}
      </div>
    </>
  );
};

export default FeaturedImageConsole;
