"use client";

import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Vendor } from "@/payload-types";

interface FeaturedReelProps {
  title: string;
  subtitle?: string;
  category: string;
  user?: string;
  featured?: boolean;
  href?: string;
}

const FeaturedReel = ({
  title,
  subtitle,
  category,
  user,
  featured,
  href,
}: FeaturedReelProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  const top4 = results.data?.top4 as Vendor[];

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {featured === false ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Featured {title}
            </h1>
          )}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div>
          {href ? (
            <Link
              href={href}
              className="font-normal text-sm text-blue-500 flex gap-2 items-center hover:underline"
            >
              Discover {title}{" "}
              <span>
                <MoveRight className="h-4 w-4" />
              </span>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            <div className="bg-white p-6 rounded-sm shadow-md">
              <ProductListing
                vendor={results.data?.top as Vendor}
                index={0}
                user={user}
              />
            </div>

            {results.data &&
              top4.map((vendor, i) => (
                <div
                  className="bg-white p-6 rounded-sm shadow-md"
                  key={vendor.id}
                >
                  <ProductListing
                    index={i}
                    //@ts-ignore
                    vendor={vendor.vendor}
                    user={user}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedReel;
