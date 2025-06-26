"use client";

import { Switch } from "@/components/ui/switch";
import { BadgeCheck, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import BecomeAVendor from "@/components/BecomeAVendor";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

const Supervendor200 = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <main className="mx-4 my-12">
      <div className="text-center text-balance">
        <h1 className="mb-4 text-2xl font-normal py-6 md:text-3xl lg:text-4xl">
          Become a <span className="font-bold">Sarang Sayang Vendor </span>
          Today!
        </h1>
      </div>
      {/* <div className="w-full flex justify-center items-center">
        <div className="w-[80%] lg:w-[60%] p-10">
          <Image
            width={6912}
            height={3456}
            src="/ads/sscny.jpg"
            alt="ad1"
            unoptimized={true}
          />
        </div>
      </div> */}
      <div className="bg-sky-200 w-full flex justify-center items-center">
        <div className="w-[80%] lg:w-[60%] bg-white rounded-md p-10 shadow-lg flex flex-col lg:grid lg:grid-cols-2 m-10">
          <div className="col-span-1 flex flex-col justify-center items-center shadow-md py-4 lg:py-12 px-4 lg:px-12 rounded-md">
            <div className="w-full flex justify-center items-center py-4">
              {!yearly ? (
                <>
                  <div>
                    {/* <span className="text-2xl tracking-tight line-through">
                      $25
                    </span> */}
                    <span className="text-4xl font-medium tracking-tight">
                      $25
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-full flex justify-center bg-red-200"></div>
                  <div>
                    <span className="text-4xl font-medium tracking-tight">
                      $255
                    </span>
                    <span className="text-gray-500">/year</span>
                  </div>
                  {/* <Badge variant="default">15% Off</Badge> */}
                </div>
              )}
            </div>
            <div className="flex flex-row gap-3 items-center">
              <p className="text-sm font-light">Monthly</p>
              <Switch checked={yearly} onCheckedChange={setYearly} />
              <p className="text-sm font-light">Yearly</p>
            </div>
            {!yearly ? (
              // <Button className="w-full my-6" asChild>
              //   <Link
              //     href={
              //       "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-1K953383AM916294WM4LDUBY"
              //     }
              //     target="_blank"
              //   >
              //     Become a Vendor Now
              //   </Link>
              // </Button>
              <BecomeAVendor
                yearly={false}
                desc="Be a part of the Sarang Sayang family for $25 per month! Submit your vendor info and our team will contact you shortly."
              />
            ) : (
              // <Button className="w-full my-6" asChild>
              //   <Link
              //     href={
              //       "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-20G56480KN739210AM4LDVAI"
              //     }
              //     target="_blank"
              //   >
              //     Become a Vendor Now
              //   </Link>
              // </Button>
              <BecomeAVendor
                yearly={true}
                desc="Smart choice! Enjoy 15% off for being with us for a year- Be a part of the Sarang Sayang family for $255 a year! Submit your vendor info and our team will contact you shortly."
              />
            )}
          </div>

          <div className="col-span-1">
            <div className="lg:p-8 py-4">
              <ul className="flex-1 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="ml-3 text-base font-medium">
                      Access to dashboard
                    </p>
                    <p className="ml-3 text-sm">View your profile statistics</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="ml-3 text-base font-medium">
                      Update vendor profile
                    </p>
                    <p className="ml-3 text-sm">
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
                    <p className="ml-3 text-sm">
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
                    <p className="ml-3 text-sm">Keep track of your own leads</p>
                    <p className="ml-3 text-sm">
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
                    <p className="ml-3 text-sm">Access to all user messages</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-sm italic text-slate-400 text-pretty">
                Subcriptions can be cancelled anytime by dropping us an e-mail
                at <span className="font-semibold">sales@sarangsayang.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Supervendor200;
