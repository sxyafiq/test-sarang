"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Featured11Pull from "./Featured11Pull";

interface Featured11Props {
  user?: string;
}

const VENDOR_CATEGORIES1 = [
  {
    label: "Venues",
    value: "venues",
  },
  {
    label: "Wedding Stylist",
    value: "stylist",
  },
  {
    label: "Berkat & Gubahan",
    value: "berkatgubahan",
  },
  {
    label: "Photo & Video",
    value: "photovideo",
  },
];

const VENDOR_CATEGORIES2 = [
  {
    label: "Bridals",
    value: "bridals",
  },
  {
    label: "Make Up Artist",
    value: "mua",
  },
  {
    label: "Emcees & Performers",
    value: "emceesperformers",
  },
  {
    label: "Misc",
    value: "misc",
  },
];

const Featured11 = ({ user }: Featured11Props) => {
  return (
    <section className="py-9">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Popular Vendors
          </h1>
        </div>
      </div>

      <Carousel
        className="px-6"
        // plugins={[
        //   Autoplay({
        //     delay: 3000,
        //   }),
        // ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VENDOR_CATEGORIES1.map((category, i) => (
                <Featured11Pull
                  index={i}
                  label={category.label}
                  category={category.value}
                  key={category.value}
                  user={user}
                />
              ))}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VENDOR_CATEGORIES2.map((category, i) => (
                <Featured11Pull
                  index={i}
                  label={category.label}
                  category={category.value}
                  key={category.value}
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
};

export default Featured11;
