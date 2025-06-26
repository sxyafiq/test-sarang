"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { trpc } from "@/trpc/client";

const PhotoVideoBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "65a07bbf9cd6475e4b367c27",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/65a07bbf9cd6475e4b367c27"} target="_blank">
          <div className="bg-[url('/wolf2.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-base md:text-lg font-bold">
                  Wolfpac Weddings
                </h1>
              </div>
              <p className="text-slate-500 text-xs md:text-sm">
                Quote &quot;SARANGSAYANG&quot; to get 10% off Wolfpac&apos;s
                photography
              </p>
              <p className="text-slate-500 text-xs md:text-sm">
                packages and an additional Preppy Magazine into selected
                packages.
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default PhotoVideoBanner;
