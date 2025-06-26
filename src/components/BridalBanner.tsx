"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { trpc } from "@/trpc/client";

const BridalBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "65a0a4029cd6475e4b36b4e4",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/65a0a4029cd6475e4b36b4e4"} target="_blank">
          <div className="bg-[url('/sdc.png')] bg-cover bg-center relative h-[270px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-5 bg-white rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-lg font-bold">the knot.</h1>
              </div>
              <p className="text-slate-500 text-sm">
                Quote &quot;SARANGSAYANG&quot; to get $50 off with a minimum
                spend of $400! (Promo valid till August 31st 2024)
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default BridalBanner;
