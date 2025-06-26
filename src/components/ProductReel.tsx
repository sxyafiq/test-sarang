"use client";

import { TQueryValidator } from "../lib/validators/query-validator";
import { Vendor } from "../payload-types";
import { trpc } from "../trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { sendDSVEmail } from "@/actions/sendDSVEmail";
import { sendCTVEmail } from "@/actions/sendCTVEmail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories } from "@/app/data/data";
import Image from "next/image";
import { toast } from "./ui/use-toast";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
  user?: string;
  idvPage?: boolean;
  vendorName?: string;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query, user, idvPage, vendorName } = props;

  const [dsvData, setDSVData] = useState({
    vendorName: "",
    category: "",
    name: "",
    contact: "",
    email: "",
  });

  const checkUser = trpc.checkUserExist.useQuery({
    email: dsvData.email,
  });

  const [ctvData, setCTVData] = useState({
    vendor: vendorName,
    name: "",
    contact: "",
    email: "",
  });

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Vendor | null)[] = [];
  if (products && products.length) {
    map = products as [];
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-9">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href && !idvPage ? (
          <Link
            href="/become-a-vendor"
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Don&apos;t see your vendor
            <span aria-hidden="true">?</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          {map.length > 0 ? (
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {map.map((product, i) => (
                <ProductListing
                  key={`product-${i}`}
                  vendor={product}
                  index={i}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full items-center">
              <Image
                src="https://i.giphy.com/media/BH5IJXyT6bsyL1QtS9/giphy-downsized.gif"
                alt="WeddingExcited"
                width={480}
                height={270}
                className="mt-3"
              />
              <p className="text-slate-600 italic mt-4">
                Aww man, no vendors found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
