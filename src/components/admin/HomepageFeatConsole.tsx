"use client";

import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import HomepageSlots from "./HomepageSlots";

const page1 = [1, 2, 3, 4];
const page2 = [5, 6, 7, 8];

const HomepageFeatConsole = () => {
  return (
    <MaxWidthWrapper className="mt-10">
      <h1 className="text-xl font-semibold">Homepage</h1>
      <div className="mt-2 py-10 w-full h-full bg-slate-50 rounded-lg shadow-lg">
        <Carousel className="px-6">
          <CarouselContent>
            <CarouselItem>
              <div className="grid grid-cols-4 gap-4">
                {page1.map((slot) => (
                  <HomepageSlots key={slot} slot={slot} />
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-4 gap-4">
                {page2.map((slot) => (
                  <HomepageSlots key={slot} slot={slot} />
                ))}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:grid bg-slate-200" />
          <CarouselNext className="hidden md:grid bg-slate-200" />
        </Carousel>
      </div>
    </MaxWidthWrapper>
  );
};

export default HomepageFeatConsole;
