"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { trpc } from "@/trpc/client";

const VenueBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "677b9be524ae4fe86eef292e",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/677b9be524ae4fe86eef292e"} target="_blank">
          <div className="bg-[url('/flyer.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-base md:text-lg font-bold">
                  Singapore Flyer Grand Ballroom
                </h1>
                {/* <BadgeCheck
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-yellow-400"
                /> */}
              </div>
              <p className="text-slate-500 text-xs md:text-sm">
                Check out Singapore Flyers Event Hall&apos;s vendor profile &
                enquire for your wedding venue today.
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default VenueBanner;
