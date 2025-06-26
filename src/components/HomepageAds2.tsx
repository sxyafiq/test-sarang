"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Badge } from "./ui/badge";

const HomepageAds2 = () => {
  return (
    <section className="shadow-xl">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem className="w-full h-fit flex flex-col items-center justify-center">
            <Link
              href={`https://open.spotify.com/show/3k1f239b4o0ais2Yt5OID2`}
              target="_blank"
            >
              <Image
                width={1920}
                height={1080}
                src="/ads/OI.jpg"
                alt="ad1"
                unoptimized={true}
              />
            </Link>
          </CarouselItem>
          <CarouselItem className="w-full h-fit flex flex-col items-center justify-center">
            <Link href={`#`} target="_blank">
              <Image
                width={1920}
                height={1080}
                src="/ads/SSHomepageAds.jpg"
                alt="ad1"
                unoptimized={true}
              />
            </Link>
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </section>
  );
};

export default HomepageAds2;
