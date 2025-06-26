"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Featured11Pull from "./Featured11Pull";
import { trpc } from "@/trpc/client";
import HomepageVendorsPull from "./HomepageVendorsPull";
import { Vendor } from "@/payload-types";

interface Featured11Props {
  user?: string;
}

const Page1 = [1, 2, 3, 4];

const Page2 = [5, 6, 7, 8];

const HomepageVendors = ({ user }: Featured11Props) => {
  const { data: vendors } = trpc.getSlotVendor.useQuery();

  function whichSlot(
    n: number,
    object: {
      slot1: Vendor;
      slot2: Vendor;
      slot3: Vendor;
      slot4: Vendor;
      slot5: Vendor;
      slot6: Vendor;
      slot7: Vendor;
      slot8: Vendor;
    }
  ) {
    if (n == 1) {
      return object.slot1;
    } else if (n == 2) {
      return object.slot2;
    } else if (n == 3) {
      return object.slot3;
    } else if (n == 4) {
      return object.slot4;
    } else if (n == 5) {
      return object.slot5;
    } else if (n == 6) {
      return object.slot6;
    } else if (n == 7) {
      return object.slot7;
    } else if (n == 8) {
      return object.slot8;
    }
  }
  if (vendors) {
    const vendor = vendors[0];
    return (
      <section className="py-9">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Popular Vendors
            </h1>
          </div>
        </div>

        <Carousel className="px-6">
          <CarouselContent>
            <CarouselItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Page1.map((item) => (
                  <HomepageVendorsPull
                    //@ts-ignore
                    vendor={whichSlot(item, vendor) as Vendor}
                    index={item - 1}
                    isLoading={false}
                    key={item}
                    user={user}
                  />
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Page2.map((item) => (
                  <HomepageVendorsPull
                    //@ts-ignore
                    vendor={whichSlot(item, vendor) as Vendor}
                    index={item - 5}
                    isLoading={false}
                    key={item}
                    user={user}
                  />
                ))}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:grid bg-slate-200" />
          <CarouselNext className="hidden md:grid bg-slate-200" />
        </Carousel>
      </section>
    );
  } else {
    <section className="py-9">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Popular Vendors
          </h1>
        </div>
      </div>

      <Carousel className="px-6">
        <CarouselContent>
          <CarouselItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Page1.map((item) => (
                <HomepageVendorsPull
                  //@ts-ignore
                  vendor={undefined}
                  index={item - 1}
                  isLoading={true}
                  key={item}
                />
              ))}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Page2.map((item) => (
                <HomepageVendorsPull
                  //@ts-ignore
                  vendor={undefined}
                  index={item - 5}
                  isLoading={true}
                  key={item}
                />
              ))}
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:grid bg-slate-200" />
        <CarouselNext className="hidden md:grid bg-slate-200" />
      </Carousel>
    </section>;
  }
};

export default HomepageVendors;
