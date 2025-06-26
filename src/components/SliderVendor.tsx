import { Vendor } from "@/payload-types";
import React from "react";
import Image from "next/image";

interface SliderVendorProps {
  vendor: Vendor;
}

const SliderVendor = ({ vendor }: SliderVendorProps) => {
  return (
    <div className="h-[300px] flex flex-row">
      <Image
        //@ts-ignore
        src={vendor.images[0].image.sizes.thumbnail.url}
        width={400}
        height={300}
        alt={vendor.name}
        className="object-cover"
      />
      {/* <div className="bg-blue-200 h-full w-[100px] p-5">
        <p>TEST</p>
      </div> */}
    </div>
  );
};

export default SliderVendor;
