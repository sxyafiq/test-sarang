import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddOns from "@/components/sales/AddOns";

export default async function Addons() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (!user) {
    return (
      <>
        <MaxWidthWrapper className="mt-10">
          <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold">Oh no..</h1>
              <p>You have to be signed in first, my friend!</p>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href={`/sign-in?origin=addons`}>Sign In</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </>
    );
  } else if (user) {
    return <AddOns userId={user.id} />;
  }
}
