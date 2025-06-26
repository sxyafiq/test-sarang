import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { Check, Loader } from "lucide-react";
import GuestCont from "@/components/plan/GuestCont";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Guests = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <MaxWidthWrapper className="flex-1 space-y-4 py-10">
      <div className="flex items-center justify-between space-y-2 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guest List</h2>
          <p className="text-muted-foreground italic">
            We know that you want to invite everyone *wink wink* but you&apos;ll
            have to narrow it down.
          </p>
          <div className="flex flex-row items-center gap-1 text-muted-foreground italic">
            <p>Make sure to click</p>
            <Button
              variant="outline"
              size="icon"
              className="bg-gradient-to-r from-amber-200 to-emerald-200 w-6 h-6"
            >
              <Check className="h-3" />
            </Button>
            <p>to save your details.</p>
          </div>
        </div>
      </div>
      {user ? (
        <GuestCont userId={user?.id} />
      ) : (
        <MaxWidthWrapper className="mt-10">
          <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold">Oh no..</h1>
              <p>You have to be signed in first, my friend!</p>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href={`/sign-in?origin=plan/guests`}>Sign In</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      )}
    </MaxWidthWrapper>
  );
};

export default Guests;
