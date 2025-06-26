import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CategorizedLikes from "@/components/plan/CategorizedLikes";
import { Button } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import { Loader } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Wishlist() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <MaxWidthWrapper className="flex-1 space-y-4 py-10">
      <div className="flex items-center justify-between space-y-2 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wishlist</h2>
          <p className="text-muted-foreground">
            You got taste! Here&apos;s an overview of vendors you&apos;ve liked.
          </p>
        </div>
      </div>
      {user ? (
        <CategorizedLikes userId={user.id} />
      ) : (
        <MaxWidthWrapper className="mt-10">
          <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold">Oh no..</h1>
              <p>You have to be signed in first, my friend!</p>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href={`/sign-in?origin=plan/wishlist`}>Sign In</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      )}
    </MaxWidthWrapper>
  );
}
