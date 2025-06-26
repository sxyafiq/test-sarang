import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { VENDOR_CATEGORIES } from "@/config";
import FeaturedImageConsole from "./FeaturedImageConsole";

const NavbarFeatConsole = () => {
  return (
    <MaxWidthWrapper>
      <h1 className="text-xl font-semibold">NavBar</h1>
      <div className="grid grid-cols-6 gap-4 mt-2 py-10 w-full h-full bg-slate-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center col-span-1">
          <ChevronLeft size={30} className="text-slate-300" />
        </div>
        <div className="col-span-4 grid grid-cols-4 gap-y-5 gap-x-3">
          {VENDOR_CATEGORIES.map((vendor) => (
            <div className="flex-row justify-items-center" key={vendor.value}>
              <FeaturedImageConsole category={vendor.value} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center col-span-1">
          <ChevronRight size={30} className="text-slate-300" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default NavbarFeatConsole;
