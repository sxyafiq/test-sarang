"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { trpc } from "@/trpc/client";

const BerkatBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "66ffa7d04a70670487fcdaa3",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/66ffa7d04a70670487fcdaa3"} target="_blank">
          <div className="bg-[url('/qs.JPG')] bg-cover bg-center relative h-[270px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-5 bg-white rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-lg font-bold">Qandle Sense</h1>
              </div>
              <p className="text-slate-500 text-sm">
                Check out Qandle Sense&apos;s vendor profile & enquire for your
                wedding berkat today
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default BerkatBanner;
