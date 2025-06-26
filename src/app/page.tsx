import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import HomepageAds from "@/components/HomepageAds";
import Featured11 from "@/components/Featured11";
import CreatePlanButton from "@/components/plan/CreatePlanButton";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Tiktok from "@/components/Tiktok";
import HomepageVendors from "@/components/HomepageVendors";
import AngelSearch from "@/components/AngelSearch";

export default async function Home() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <div className="mx-auto py-6 bg-[url('/hero.png')] bg-cover bg-center shadow-md">
        <MaxWidthWrapper className="text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            A <span className="text-blue-400">Platform</span> For All Things{" "}
          </h1>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className="text-blue-400">Malay Weddings</span> in{" "}
            <span className="text-blue-400">Singapore</span>.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Don&apos;t know where to start? Discover over 100 vendors or start
            wedding planning!
          </p>
          {/* <AngelSearch /> */}
          {/* <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/featuredvendors" className={buttonVariants()}>
              Start Browsing
            </Link>
            <div className="hidden lg:block">
              {!user ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost">
                        Unlock Wedding Planner{" "}
                        <LockKeyhole className="ml-1 h-4 w-4 transition-all text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You have to be logged in!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <CreatePlanButton userId={user.id} />
              )}
            </div>
          </div> */}
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        {/* <Featured11 user={user?.id} /> */}
        <HomepageVendors user={user?.id} />
        <HomepageAds />
      </MaxWidthWrapper>

      <Tiktok />
      <MaxWidthWrapper>
        <ProductReel
          user={user?.id}
          title="Recently Added"
          query={{ limit: 8 }}
        />
      </MaxWidthWrapper>
    </>
  );
}
