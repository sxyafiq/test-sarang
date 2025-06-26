"use client";

import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Like, User, Vendor } from "@/payload-types";
import Image from "next/image";
import ImageSlider from "../ImageSlider";
import Badge from "../Badge";

interface CatLikeItemProps {
  category: string;
  data: Like[];
  icon: any;
  label: string;
}

const CatLikeItem = ({ category, data, icon, label }: CatLikeItemProps) => {
  const results = [];

  let itemCount = 0;

  for (let i = 0; i < data.length; i++) {
    const vendor = data[i].vendor as Vendor;
    const vendorId = vendor.id;

    const vendors = trpc.getVendor.useQuery({
      id: vendorId,
    });

    if (vendors.status === "loading") {
      <Loader className="animate-spin" />;
    } else if (vendors.status === "success") {
      const vendor = vendors.data.docs;

      for (let x = 0; x < vendor.length; x++) {
        if (vendor[x].category === category) {
          results.push(vendor[x]);
          itemCount++;
        }
      }
    }
  }

  function getImagesArray(images: object[]) {
    const validUrls = images
      //@ts-ignore
      .map(({ image }) => (typeof image === "string" ? image : image.url))
      .filter(Boolean) as string[];

    return validUrls;
  }

  const getUserRole = (user: User) => {
    return user.role;
  };

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-4 w-full">
        <div className=" flex items-center justify-between w-full">
          <h3 className="flex items-center gap-3 text-xl font-semibold text-gray-900 sm:text-3xl">
            <span>{icon}</span> {label}
          </h3>
          <p className="text-md font-light text-right">
            {itemCount}{" "}
            {itemCount === 1 ? (
              <span>{"vendor found"}</span>
            ) : (
              <span>{"vendors found"}</span>
            )}
          </p>
        </div>
      </div>
      {results.length === 0 ? (
        <p className="text-slate-600 italic">No likes found!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {results.map((vendor) => (
            <div className="space-y-3 pt-6" key={vendor.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col w-full px-6">
                  <Link
                    href={`/vendor/${vendor.id}`}
                    className="cursor-pointer"
                  >
                    <ImageSlider urls={getImagesArray(vendor.images)} />
                    <h3 className="flex items-center gap-2 mt-4 font-medium text-sm text-gray-700">
                      {vendor.name}
                      {/* @ts-ignore */}
                      <span>
                        <Badge
                          vendorRole={getUserRole(vendor.venduserid as User)}
                        />
                      </span>
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CatLikeItem;
