import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CRMCont from "@/components/crm/CRMCont";
import { Card } from "@/components/ui/card";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import TVLCont from "@/components/analytics/cards/vendorlikes/TVLCont";
import TECont from "@/components/analytics/cards/enquiries/TECont";
import SSCont from "@/components/analytics/cards/enquiries/SSCont";
import TVCCont from "@/components/analytics/cards/vendorClicks/TVCCont";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScoreboardCont from "@/components/analytics/ScoreboardCont";

export default async function Dashboard() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <MaxWidthWrapper className="space-y-4 pt-6 pt-10">
        <div className="flex items-center justify-between space-y-2 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back{user ? ", " + user.name : null}!
            </h2>
            <p className="text-muted-foreground text-balance">
              Here&apos;s the most important part of Sarang Sayang for all our
              vendors- keeping track of your leads! All the users who have
              chatted with you will appear in our very own CRM. Select Vendor
              Profile to start.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
      {user ? (
        <>
          <ScoreboardCont userId={user.id} role={user.role} />
        </>
      ) : (
        <MaxWidthWrapper>
          <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold">Oh no..</h1>
              <p>You have to be signed in first, my friend!</p>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href={`/sign-in?origin=dashboard`}>Sign In</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      )}
    </>
  );
}
