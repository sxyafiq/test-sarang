"use client";

import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Supervendor200 = () => {
  const [sixmth, setSixmth] = useState(false);
  return (
    <main className="mx-4 my-12">
      <div className="text-center text-balance">
        <h1 className="mb-4 text-2xl font-normal py-6 md:text-3xl lg:text-4xl">
          Hey there! Here are{" "}
          <span className="font-bold">Sarang Sayang Vendor Plans.</span>
        </h1>
      </div>

      <MaxWidthWrapper className="py-4 lg:w-[1000px]">
        <Image
          width={1280}
          height={360}
          src="/ads/ssmyp.jpg"
          alt="ad1"
          unoptimized={true}
        />
      </MaxWidthWrapper>

      <div className="flex flex-col items-center justify-center mt-5 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
        <div className="flex flex-col items-center gap-2">
          <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
            {/* Price */}
            <div className="flex-shrink-0">
              <span className="text-4xl font-medium tracking-tight">Free</span>
              <span className="text-gray-400">/forever</span>
            </div>

            {/* Name and DESC */}
            <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
              <div className="flex items-center gap-1">
                <h2 className="text-2xl font-normal">Offical Vendor</h2>
                <BadgeCheck
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-blue-400"
                />
              </div>
              <p className="text-sm text-gray-400">
                All vendors who have claimed their vendor profile are
                automatically an Official Sarang Sayang Vendor.
              </p>
            </div>

            <ul className="flex-1 space-y-4">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Access to dashboard
                  </p>
                  <p className="ml-3 text-sm italic font-light">
                    View your profile statistics
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Update vendor profile
                  </p>
                  <p className="ml-3 text-sm italic font-light">
                    Add/Edit as many photos and packages
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Vendor profile visibility
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Enquiry notifications
                  </p>
                  <p className="ml-3 text-sm italic font-light">
                    Upgrade to view user details/messages
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Access to personal CRM Platform
                  </p>
                  <p className="ml-3 text-sm italic font-light">
                    Keep track of your own leads
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="flex flex-col items-center gap-2">
          <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
            {/* Price */}
            <div className="flex-shrink-0">
              {!sixmth ? (
                <>
                  <span className="text-2xl font-medium tracking-tight line-through">
                    $200
                  </span>
                  <div>
                    <span className="text-4xl font-medium tracking-tight">
                      $120
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl font-medium tracking-tight line-through">
                    $1920
                  </span>
                  <div>
                    <span className="text-4xl font-medium tracking-tight">
                      $1150
                    </span>
                    <span className="text-gray-400">/year</span>
                  </div>
                </>
              )}
              <Badge variant="outline">One Year Plan</Badge>
            </div>

            {/* Name and DESC */}
            <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
              <div className="flex items-center gap-1">
                <h2 className="text-2xl font-normal">Supervendor</h2>
                <BadgeCheck
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-yellow-400"
                />
              </div>
              <p className="text-sm text-gray-400">
                Other than the cool Gold tick, our Supervendors will have more
                access to our users.
              </p>
            </div>

            <ul className="flex-1 space-y-4">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Access to dashboard
                  </p>
                  <p className="ml-3 text-sm italic font-light">
                    View your profile statistics
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Update vendor profile
                  </p>
                  <p className="ml-3 text-sm italic font-light">
                    Add/Edit as many photos and packages
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Vendor profile visibility
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Enquiry notifications
                  </p>
                  <p className="ml-3 text-sm italic font-light text-yellow-600">
                    User details can now be viewed
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Access to personal CRM Platform
                  </p>
                  <p className="ml-3 text-sm italic font-light ">
                    Keep track of your own leads
                  </p>
                  <p className="ml-3 text-sm italic font-light text-yellow-600">
                    + Sarang Sayang Leads will appear here
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium">
                    Direct Messaging Function
                  </p>
                  <p className="ml-3 text-sm italic font-light text-yellow-600">
                    Access to all user messages,
                  </p>
                  <p className="ml-3 text-sm italic font-light text-yellow-600">
                    and be able to reply to
                  </p>
                  <p className="ml-3 text-sm italic font-light text-yellow-600">
                    all enquiries instantly
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="ml-3 text-base font-medium text-balance">
                    Entitled to Featured Vendor Add Ons
                  </p>
                  <p className="ml-3 text-sm italic font-light text-yellow-600">
                    First come first serve
                  </p>
                </div>
              </li>
            </ul>

            {/* Plan switch */}
            <div>
              <div className="flex items-center justify-center mt-18 space-x-4 border-t p-5">
                <p className="font-medium text-sm">Bill Monthly</p>
                <Switch checked={sixmth} onCheckedChange={setSixmth} />
                <p className="text-sm font-medium flex flex-col">
                  Bill Annually <span className="font-light">(20% off)</span>
                </p>
              </div>
              {sixmth ? (
                <p className="text-sm font-light text-center text-gray-400 mt-3">
                  All annual plans are non-refundable.
                </p>
              ) : (
                <p className="text-sm font-light text-center text-balance text-gray-400 mt-3">
                  Drop us an e-mail to cancel your monthly subscription anytime!
                </p>
              )}
            </div>

            <Button className="w-full">
              <Link href={"/sign-in?origin=status"}>Upgrade Now</Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Supervendor200;
