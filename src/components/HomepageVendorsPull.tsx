"use client";

import ProductListing from "./ProductListing";
import { Vendor } from "@/payload-types";

interface HomepageVendorsPullProps {
  vendor: Vendor;
  user?: string;
  index: number;
  isLoading: boolean;
}

const HomepageVendorsPull = ({
  user,
  vendor,
  index,
  isLoading,
}: HomepageVendorsPullProps) => {
  if (!isLoading) {
    return (
      <div className="w-50 min-h-40 md:min-h-80">
        {user ? (
          <ProductListing index={index} vendor={vendor} user={user} />
        ) : (
          <ProductListing index={index} vendor={vendor} />
        )}
      </div>
    );
  } else {
    return (
      <div className="bg-slate-200 animate-pulse w-full h-full aspect-square rounded-2xl"></div>
    );
  }
};

export default HomepageVendorsPull;
