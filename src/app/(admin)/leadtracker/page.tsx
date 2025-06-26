import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import LikeBook from "@/components/admin/LikeBook";
import { VENDOR_CATEGORIES } from "@/config";
import LikeBookCat from "@/components/admin/LikeBookCategories";
import LikesTransfer from "@/components/LikesTransfer";
import LeadTracker from "@/components/admin/LeadTracker";

const leadtracker = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <MaxWidthWrapper className="space-y-4 pt-6">
        <div className="flex items-center justify-between space-y-2 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              My Dearest Ning-Ga{" "}
              <span className="text-sky-500">Sarang Sayang {user?.name}</span>
            </h2>
          </div>
        </div>
      </MaxWidthWrapper>

      {user && user.role === "admin" ? (
        <>
          {/* <LikesTransfer /> */}
          {/* <div className="flex flex-col gap-6">
            <h1>It goes like this</h1>
          </div> */}
          <LeadTracker />
        </>
      ) : (
        <MaxWidthWrapper>
          <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold">Hi?</h1>
              <p>You are not supposed to be here..</p>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href={`/`}>Back to Homepage</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      )}
    </>
  );
};

export default leadtracker;
