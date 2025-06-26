"use client";

import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { Vendor } from "@/payload-types";
import { Skeleton } from "./ui/skeleton";

interface Featured11PullProps {
  category: string;
  label: string;
  user?: string;
  index: number;
}

const Featured11Pull = ({
  user,
  category,
  label,
  index,
}: Featured11PullProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  return (
    <div className="w-50 min-h-40 md:min-h-80">
      {results.isLoading ? (
        <div className="flex flex-col w-full">
          <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
            <Skeleton className="h-full w-full" />
          </div>
          <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
          <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
          <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
        </div>
      ) : null}
      {user && results.isFetched && results.data?.top ? (
        <ProductListing
          index={index}
          vendor={results.data.top as Vendor}
          user={user}
        />
      ) : null}
      {!user && results.isFetched && results.data?.top ? (
        <ProductListing
          index={index}
          vendor={results.data.top as Vendor}
          user={user}
        />
      ) : null}
    </div>
  );
};

export default Featured11Pull;
