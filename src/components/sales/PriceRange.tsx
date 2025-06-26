"use client";

import Image from "next/image";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { BadgeCheck, CheckCircle, Crown, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { trpc } from "@/trpc/client";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { sendFeatVendForm } from "@/actions/sendFeatVendForm";
import { Vendor } from "@/payload-types";
import { sendTopVendForm } from "@/actions/sendTopVendForm";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Badge } from "../ui/badge";

interface PriceRangeProps {
  userRole: string;
  userId: string;
  hasSub: boolean;
  //portal: string;
  //checkoutLink: string;
}

interface PriceObject {
  monthly: number;
  monthly5: number;
}

interface LinkObject {
  monthly: string;
  monthly5: string;
}

const PriceRange = ({ userRole, userId, hasSub }: PriceRangeProps) => {
  const [sixmth, setSixmth] = useState(false);

  const vendor = trpc.getVendorId.useQuery({
    userId: userId,
  });

  const vendorAsVendor = vendor.data?.docs[0] as unknown as Vendor;

  function isFirst6Price(category: string, price: PriceObject) {
    if (category === "venues") {
      return price.monthly;
    } else if (category === "stylist") {
      return price.monthly5;
    } else if (category === "bridals") {
      return price.monthly5;
    } else if (category === "photovideo") {
      return price.monthly5;
    } else if (category === "berkatgubahan") {
      return price.monthly5;
    } else if (category === "mua") {
      return price.monthly5;
    } else if (category === "emceesperformers") {
      return price.monthly5;
    } else if (category === "misc") {
      return price.monthly5;
    }
  }

  function isFirst6Link(category: string, link: LinkObject) {
    if (category === "venues") {
      return link.monthly;
    } else if (category === "agents") {
      return link.monthly;
    } else if (category === "bridals") {
      return link.monthly5;
    } else if (category === "photovideo") {
      return link.monthly5;
    } else if (category === "henna") {
      return link.monthly5;
    } else if (category === "mua") {
      return link.monthly5;
    } else if (category === "emceesperformers") {
      return link.monthly5;
    } else if (category === "misc") {
      return link.monthly5;
    }
  }

  return (
    <main className="mx-4 my-12">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
          <span className="font-semibold">Sarang Sayang Vendor Plans</span>
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

      <Tabs
        defaultValue="plans"
        className="w-full flex flex-col items-center mt-3"
      >
        <TabsList className="grid w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="addon">Add On</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="flex flex-col items-center justify-center mt-5 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {!hasSub ? <Crown className="text-yellow-600" /> : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You are here!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0">
                  <span className="text-4xl font-medium tracking-tight">
                    Free
                  </span>
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
              <div className="h-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {hasSub ? <Crown className="text-yellow-600" /> : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You are here!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0">
                  {/* <span className="text-4xl font-medium tracking-tight">$</span> */}
                  {!sixmth ? (
                    <>
                      <span className="text-2xl font-medium tracking-tight line-through">
                        $
                        {vendor.data && vendor.data.docs[0].category ? (
                          isFirst6Price(
                            vendor.data.docs[0].category as string,
                            {
                              monthly: 500,
                              monthly5: 200,
                            }
                          )
                        ) : (
                          <Loader2 className="animate-spin text-blue-500" />
                        )}
                      </span>
                      <div>
                        <span className="text-4xl font-medium tracking-tight">
                          $
                          {vendor.data && vendor.data.docs[0].category ? (
                            isFirst6Price(
                              vendor.data.docs[0].category as string,
                              {
                                monthly: 300,
                                monthly5: 120,
                              }
                            )
                          ) : (
                            <Loader2 className="animate-spin text-blue-500" />
                          )}
                        </span>
                        <span className="text-gray-400">/month</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-medium tracking-tight line-through">
                        $
                        {vendor.data && vendor.data.docs[0].category ? (
                          isFirst6Price(
                            vendor.data.docs[0].category as string,
                            {
                              monthly: 4800,
                              monthly5: 1920,
                            }
                          )
                        ) : (
                          <Loader2 className="animate-spin text-blue-500" />
                        )}
                      </span>
                      <div>
                        <span className="text-4xl font-medium tracking-tight">
                          $
                          {vendor.data && vendor.data.docs[0].category ? (
                            isFirst6Price(
                              vendor.data.docs[0].category as string,
                              {
                                monthly: 2880,
                                monthly5: 1150,
                              }
                            )
                          ) : (
                            <Loader2 className="animate-spin text-blue-500" />
                          )}
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
                    Other than the cool Gold tick, our Supervendors will have
                    more access to our users.
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
                      Bill Annually{" "}
                      <span className="font-light">(20% off)</span>
                    </p>
                  </div>
                  {sixmth ? (
                    <p className="text-sm font-light text-center text-gray-400 mt-3">
                      All annual plans are non-refundable.
                    </p>
                  ) : (
                    <p className="text-sm font-light text-center text-balance text-gray-400 mt-3">
                      Drop us an e-mail to cancel your monthly subscription
                      anytime!
                    </p>
                  )}
                </div>

                <Button
                  disabled={hasSub || !vendor.isSuccess}
                  className="w-full"
                >
                  {sixmth ? (
                    <Link
                      // @ts-ignore
                      href={
                        vendor.data && vendor.data.docs[0].category
                          ? isFirst6Link(
                              vendor.data.docs[0].category as string,
                              {
                                monthly:
                                  "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3F979231P1636913GMZMYFKY",
                                monthly5:
                                  "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-88Y08545BF3266141MZMYFCY",
                              }
                            )
                          : "#"
                      }
                      target="_blank"
                    >
                      Upgrade Now
                    </Link>
                  ) : (
                    <Link
                      // @ts-ignore
                      href={
                        vendor.data && vendor.data.docs[0].category
                          ? isFirst6Link(
                              vendor.data.docs[0].category as string,
                              {
                                monthly:
                                  "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-5622976628691122EMZMYESY",
                                monthly5:
                                  "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9VD114324H6016127MZMYEJA",
                              }
                            )
                          : "#"
                      }
                      target="_blank"
                    >
                      Upgrade Now
                    </Link>
                  )}
                </Button>
              </section>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="addon">
          <div className="flex flex-row justify-center">
            <p className="text-sm font-normal text-gray-600">
              All Supervendors are eligible for this Featured/Top vendor add on-
              on a first come first serve basis.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center px-20 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6"></div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-4xl font-medium tracking-tight">
                    $300
                  </span>
                </div>

                {/* Name and DESC */}
                <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                  <div className="flex items-center gap-1">
                    <h2 className="text-2xl font-normal">
                      Featured Vendor add on
                    </h2>
                  </div>
                  <p className="text-sm text-gray-400">3 slots per category</p>
                </div>

                <ul className="flex-1 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Listed in the top 4 for the month
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        On respective category page
                      </p>
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
                    <div>
                      <p className="ml-3 text-base font-medium text-balance">
                        Consolidated Social Media Post Shout out
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Featured in monthly Sarang Sayang e-mail newsletter
                      </p>
                    </div>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => {
                    sendFeatVendForm({
                      name: vendorAsVendor.name,
                      cat: vendorAsVendor.category,
                      //@ts-ignore
                      email: vendorAsVendor.venduserid.email,
                    });
                    toast({
                      title: "We have received your interest!",
                      description:
                        "We will reach out to you soon should there be a slot availability.",
                    });
                  }}
                >
                  Upgrade
                </Button>
              </section>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-6"></div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-4xl font-medium tracking-tight">
                    $500
                  </span>
                </div>

                {/* Name and DESC */}
                <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                  <div className="flex items-center gap-1">
                    <h2 className="text-2xl font-normal">Top Vendor add on</h2>
                  </div>
                  <p className="text-sm text-gray-400">1 slot per category</p>
                </div>

                <ul className="flex-1 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium text-balance">
                        Listed as the top listing of the month
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        On respective category page
                      </p>
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
                      <p className="ml-3 text-base font-medium text-balance">
                        Consolidated Social Media Post Shout out
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Featured in monthly Sarang Sayang e-mail newsletter
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
                      <p className="ml-3 text-sm italic font-light text-balance">
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
                      <p className="ml-3 text-sm italic font-light text-balance">
                        Vendor Photo will be used as the cover photo for the
                        &apos;Discover&apos; tab.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => {
                    sendTopVendForm({
                      name: vendorAsVendor.name,
                      cat: vendorAsVendor.category,
                      //@ts-ignore
                      email: vendorAsVendor.venduserid.email,
                    });
                    toast({
                      title: "We have received your interest!",
                      description:
                        "We will reach out to you soon should there be a slot availability.",
                    });
                  }}
                >
                  Upgrade
                </Button>
              </section>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default PriceRange;
