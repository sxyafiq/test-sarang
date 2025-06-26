import PriceRange from "@/components/sales/PriceRange";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Status() {
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
              <Link href={`/sign-in?origin=status`}>Sign In</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </>
    );
  }

  //await createCustomerIfNull();

  // const manage = await generateCustomerPortalLink(
  //   "" + user?.stripe_customer_id
  // );
  // const checkoutLink = await createCheckoutLink("" + user?.id);

  const vendorRole = user?.role;

  const hasSub = vendorRole === "vendor" ? false : true;

  const bgVendor = vendorRole === "vendor" ? "bg-blue-300" : "bg-yellow-300";

  function role(role: string) {
    if (role === "vendor") {
      return {
        label: "Offical Vendor",
        desc: `View your perks and how you can upgrade your status to become our Supervendor below!`,
      };
    } else if (role === "supervendor") {
      return {
        label: "Supervendor",
        desc: "You beautiful creature you. Look at that gold tick. You a star, that's what you are! You'll maintain being a Supervendor until you don't want to be as special anymore.",
      };
    }
  }
  if (user) {
    return (
      <>
        <MaxWidthWrapper
          className={cn(bgVendor, "mt-20 h-full rounded-lg shadow-md")}
        >
          {user && vendorRole ? (
            <div className="py-10 flex flex-col items-start">
              <h1 className="text-4xl font-medium py-2 flex items-baseline gap-2">
                <span className="text-2xl font-light text-balance">
                  You&apos;re currently an official
                </span>{" "}
                {role(vendorRole)?.label}
              </h1>
              <p className="text-gray-600 italic w-100 text-balance">
                {role(vendorRole)?.desc}
              </p>
            </div>
          ) : (
            <div className="py-10 w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
              <div>
                <h1 className="font-bold">Oh no..</h1>
                <p>You have to be signed in first, my friend!</p>
              </div>

              <Button asChild variant={"secondary"}>
                <Link href={`/sign-in?origin=status`}>Sign In</Link>
              </Button>
            </div>
          )}
        </MaxWidthWrapper>
        {user && vendorRole ? (
          <PriceRange
            userRole={vendorRole}
            userId={user.id}
            hasSub={hasSub}
            //portal={manage}
            //checkoutLink={checkoutLink}
          />
        ) : (
          <MaxWidthWrapper className="mt-10">
            <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
              <div>
                <h1 className="font-bold">Oh no..</h1>
                <p>You have to be signed in first, my friend!</p>
              </div>

              <Button asChild variant={"secondary"}>
                <Link href={`/sign-in?origin=status`}>Sign In</Link>
              </Button>
            </div>
          </MaxWidthWrapper>
        )}
      </>
    );
  }
}
