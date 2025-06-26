"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AddOns() {
  return (
    <>
      <MaxWidthWrapper className="space-y-4 pt-6 py-10">
        {/* <div className="p-10">
          <Image
            width={6912}
            height={3456}
            src="/ads/sscny.jpg"
            alt="ad1"
            unoptimized={true}
          />
        </div> */}
        <div className="flex items-center justify-between space-y-2 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Vendor Add Ons
            </h2>
            <p className="text-muted-foreground text-balance">
              Want more exposure on our website? All vendors are eligible for
              this Featured/Top Vendor Upgrade on a first come first serve
              basis.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-20 space-y-3 lg:flex-row lg:items-stretch lg:space-y-0">
          <div className="flex flex-col items-center gap-2">
            <div className="lg:h-6"></div>
            <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
              {/* Price */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-2xl text-gray-400">+</span>
                <span className="text-4xl font-medium tracking-tight">
                  $100
                </span>
              </div>

              {/* Name and DESC */}
              <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                <div className="flex items-center gap-1">
                  <h2 className="text-2xl font-normal">Featured Vendor</h2>
                </div>
                <p className="text-sm text-gray-400">3 slots per category</p>
              </div>

              <ul className="flex-1 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="ml-3 text-base font-medium text-balance">
                      Listed in the Top 4 for the month
                    </p>
                    <p className="ml-3 text-sm">On respective category page</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="ml-3 text-base font-medium text-balance">
                      Average increase by 230% profile visits
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">Featured in</p>
                    <p className="ml-3 text-base font-medium">
                      Monthly Sarang Sayang
                    </p>
                    <p className="ml-3 text-base font-medium">
                      E-mail Newsletter
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <div className="flex flex-col items-center gap-2">
            <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-gradient-to-t from-white to-yellow-200 rounded-lg shadow-md">
              {/* Price */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-2xl text-gray-400 drop-shadow-md">+</span>
                <div className="">
                  {/* <span className="text-2xl font-semibold tracking-tight line-through">
                    $500
                  </span> */}
                  <span className="text-4xl font-semibold tracking-tight drop-shadow-md">
                    $500
                  </span>
                </div>
              </div>

              {/* Name and DESC */}
              <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                <div className="flex items-center gap-1">
                  <h2 className="text-2xl font-semibold">Video Bundle</h2>
                </div>
                <p className="text-sm text-gray-500">1 slot per category</p>
              </div>

              <ul className="flex-1 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium text-balance">
                      2 Video Content on our social media
                    </p>
                    <p className="ml-3 text-sm text-balance">
                      Inclusive of storyboarding, filming, producing, editing
                      and upload
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium text-balance">
                      Listed as the Top Listing of the Month
                    </p>
                    <p className="ml-3 text-sm">On respective category page</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium text-balance">
                      Consolidated Social Media Post Shout out
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">Featured in</p>
                    <p className="ml-3 text-base font-medium">
                      Monthly Sarang Sayang
                    </p>
                    <p className="ml-3 text-base font-medium">
                      E-mail Newsletter
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">Featured on</p>
                    <p className="ml-3 text-base font-medium">
                      Sarang Sayang Homepage
                    </p>
                    <p className="ml-3 text-sm">
                      Easy access and maximum Exposure to our users
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">
                      Category Cover Photo
                    </p>
                    <p className="ml-3 text-sm text-balance">
                      Vendor Photo will be used as the cover photo for the
                      Discover tab
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="lg:h-6"></div>
            <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
              {/* Price */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-2xl text-gray-400">+</span>
                <span className="text-4xl font-medium tracking-tight">
                  $200
                </span>
              </div>

              {/* Name and DESC */}
              <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                <div className="flex items-center gap-1">
                  <h2 className="text-2xl font-normal">Top Vendor</h2>
                </div>
                <p className="text-sm text-gray-400">1 slot per category</p>
              </div>

              <ul className="flex-1 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium text-balance">
                      Listed as the Top Listing of the Month
                    </p>
                    <p className="ml-3 text-sm">On respective category page</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium text-balance">
                      Average Increase by 425% profile visits
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">Featured in</p>
                    <p className="ml-3 text-base font-medium">
                      Monthly Sarang Sayang
                    </p>
                    <p className="ml-3 text-base font-medium">
                      E-mail Newsletter
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">Featured on</p>
                    <p className="ml-3 text-base font-medium">
                      Sarang Sayang Homepage
                    </p>
                    <p className="ml-3 text-sm text-balance">
                      Easy access and maximum exposure to our users
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="w-full">
                    <p className="ml-3 text-base font-medium">
                      Category Cover Photo
                    </p>
                    <p className="ml-3 text-sm text-balance">
                      Vendor Photo will be used as the cover photo for the
                      &apos;Discover&apos; tab.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
        {/* <div className="flex flex-row justify-center">
          <p className="text-sm font-normal text-gray-600">
            All Supervendors are eligible for this Featured/Top vendor add on-
            on a first come first serve basis.
          </p>
        </div> */}
        <div className="w-full flex justify-center items-center py-10">
          <Button className="w-[80%] h-10" asChild>
            <Link href={"/sign-in?origin=addons"} target="_blank">
              Login to Upgrade
            </Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
