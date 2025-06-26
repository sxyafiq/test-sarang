"use client";

import { User, Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import Image from "next/image";

interface SimilarVendorsProps {
  vendor: Vendor;
  loggedUser: User;
}

const SimilarVendors = ({ vendor, loggedUser }: SimilarVendorsProps) => {
  const { data: similar } = trpc.getSimilarVendors.useQuery({
    vendorId: vendor.id,
    category: vendor.category,
  });

  return (
    // <div>
    //   <p>{vendor.name}</p>
    //   {/* <p>{JSON.stringify(similar)}</p> */}
    //   {similar ? similar.map((vendor) => <p>{vendor.name}</p>) : null}
    // </div>
    <section className="py-9">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Similar Vendors
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            While you are here, browse these vendors similar to {vendor.name}{" "}
            too!
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          {similar ? (
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {similar.map((product, i) => (
                <ProductListing
                  key={`product-${i}`}
                  vendor={product}
                  index={i}
                  user={loggedUser.id}
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

export default SimilarVendors;
