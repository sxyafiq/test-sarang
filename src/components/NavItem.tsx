"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import FeaturedImage from "./FeaturedImage";
import { Skeleton } from "./ui/skeleton";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
  locked: boolean;
  signedIn: boolean;
  identifiedPlan: boolean;
}

function lockingSystem(
  locked: boolean,
  signedIn: boolean,
  isOpen: boolean,
  identifiedPlan: boolean
) {
  if (!locked) {
    return (
      <ChevronDown
        className={cn("h-4 w-4 transition-all text-muted-foreground", {
          "-rotate-180": isOpen,
        })}
      />
    );
  } else if (locked && signedIn && identifiedPlan) {
    return (
      <ChevronDown
        className={cn("h-4 w-4 transition-all text-muted-foreground", {
          "-rotate-180": isOpen,
        })}
      />
    );
  } else if (locked) {
    return (
      <LockKeyhole className="h-4 w-4 transition-all text-muted-foreground" />
    );
  }
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
  locked,
  signedIn,
  identifiedPlan,
}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          {lockingSystem(locked, signedIn, isOpen, identifiedPlan)}
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <div className="relative bg-white">
            <div className="w-full px-8 flex items-center">
              <div className="w-full overflow-x-scroll flex flex-row">
                <div className="flex">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="min-w-[17rem] p-[40px] group"
                    >
                      <div className="relative rounded-2xl bg-gray-100 group-hover:opacity-75">
                        <Link href={item.href} onClick={() => close()}>
                          {category.value === "discover" ? (
                            //@ts-ignore
                            <FeaturedImage category={item.value} />
                          ) : (
                            <Image
                              width={197}
                              height={197}
                              src={item.imageSrc}
                              alt="product category image"
                              className="aspect-square rounded-2xl"
                              unoptimized={false}
                              onLoad={() => (
                                <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                                  <Skeleton className="h-full w-full" />
                                </div>
                              )}
                            />
                          )}
                        </Link>
                      </div>

                      <div className="mt-6 block font-medium text-gray-900">
                        <a href={item.href} className="group-hover:underline">
                          {item.name}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
