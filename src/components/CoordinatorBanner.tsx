"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { trpc } from "@/trpc/client";

const CoordinatorBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "65a81ee0dd4b315ab0a045fc",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/65a81ee0dd4b315ab0a045fc"} target="_blank">
          <div className="bg-[url('/gff.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-base md:text-lg font-bold">
                  Gff Wedding Services
                </h1>
              </div>
              <p className="text-slate-500 text-xs md:text-sm">
                Check out GFF Wedding Services vendor profile & enquire for your
                wedding coordinator services today.
              </p>
              <p className="text-slate-500 text-xs md:text-sm">
                Quote &apos;Sarang Sayang&apos; and get $1100 off your wedding
                packages.
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default CoordinatorBanner;
