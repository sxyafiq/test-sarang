"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PopularSlider from "@/components/PopularSlider";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import Link from "next/link";

const Transition = () => {
  // const transition = trpc.transition.useMutation();

  // function handleClick1() {
  //   transition.mutate();
  // }

  return (
    // <MaxWidthWrapper className="w-full h-full flex justify-center items-center justify-items-center py-10">
    //   {/* <div className="flex-row justify-center items-center justify-items-center">
    //     <h1>REMOVE DUPLICATED LIKES</h1>
    //     <Button onClick={handleClick1}>Initiate</Button>
    //   </div> */}
    //   {/* <PopularSlider /> */}

    // </MaxWidthWrapper>
    <div>
      <div
        className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5 mb-10"
        onClick={() => {}}
      >
        <MaxWidthWrapper>
          <h1 className="text-3xl mb-3 font-bold tracking-tight">
            Original Look
          </h1>
          <Link href={"/vendor/65a07bbf9cd6475e4b367c27"} target="_blank">
            <div className="bg-[url('/flyer.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
              <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white/75 rounded-2xl m-5">
                <div className="flex flex-row items-center gap-1">
                  <h1 className="text-base md:text-lg font-bold">
                    Singapore Flyer
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

      <div
        className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5 mb-10"
        // onClick={() => {
        //   addClick.mutate({
        //     vendorId: "65a07bbf9cd6475e4b367c27",
        //   });
        // }}
      >
        <MaxWidthWrapper>
          <h1 className="text-3xl mb-3 font-bold tracking-tight">Look 1</h1>
          <Link href={"/vendor/65a07bbf9cd6475e4b367c27"} target="_blank">
            <div className="bg-[url('/flyer.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
              <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white rounded-2xl m-5">
                <div className="flex flex-row items-center gap-1">
                  <h1 className="text-base md:text-lg font-bold">
                    Singapore Flyer
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

      <div
        className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5 mb-10"
        // onClick={() => {
        //   addClick.mutate({
        //     vendorId: "65a07bbf9cd6475e4b367c27",
        //   });
        // }}
      >
        <MaxWidthWrapper>
          <h1 className="text-3xl mb-3 font-bold tracking-tight">Look 2</h1>
          <Link href={"/vendor/65a07bbf9cd6475e4b367c27"} target="_blank">
            <div className="bg-[url('/flyer.png')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
              <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white/90 rounded-2xl m-5 py-3">
                <h1 className="text-base md:text-2xl font-bold">
                  Singapore Flyer
                </h1>
                <p className="text-slate-500 text-md font-semibold md:text-sm pt-1">
                  Check out Singapore Flyers Event Hall&apos;s vendor profile &
                  enquire for your wedding venue today.
                </p>
              </div>
            </div>
          </Link>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Transition;
