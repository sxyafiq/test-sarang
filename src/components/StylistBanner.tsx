"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { trpc } from "@/trpc/client";

const StylistBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "65b70a77ff74f55af1012aad",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/65b70a77ff74f55af1012aad"} target="_blank">
          <div className="bg-[url('/omt.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-base md:text-lg font-bold">
                  Our Midas Touch
                </h1>
              </div>
              <p className="text-slate-500 text-xs md:text-sm">
                Quote &quot;SARANGSAYANG&quot; to get 10% off all packages!
              </p>
              <p className="text-slate-500 text-xs md:text-sm">
                Enquire now for Intimate Wedding Dais, Bridal Room Decorations
                and Gubahan Hantaran.
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default StylistBanner;
