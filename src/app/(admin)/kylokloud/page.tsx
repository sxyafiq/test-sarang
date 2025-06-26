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

const kylokloud = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <MaxWidthWrapper className="space-y-4 pt-6">
        <div className="flex items-center justify-between space-y-2 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Meow,{" "}
              <span className="text-sky-500">Sarang Sayang {user?.name}</span>!
            </h2>
            <p className="text-muted-foreground text-balance">
              Meow&apos;s meow meow meow meowmeowmeow meow meow meowmeow
              meowmeow meow meow meow meowmeow- meowmeow meow meow meow meow!
              Meow meow meow meow meow meowmeow meow meow meow meowmeow meow
              meow meow meow{" "}
              <span className="italic text-red-500 font-bold">
                MEOWMEOWMEOW
              </span>
              . Meow meow meowmeow meow meow meow meow meow meow meow
              meowmeowmeow meow. Door. Pls.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="flex flex-row items-center justify-center bg-sky-100 mb-6 shadow-md">
        <Image
          src={"/kylo.png"}
          alt={"Kylo"}
          width={500}
          height={204}
          className="p-4"
        />
      </div>

      {user && user.role === "admin" ? (
        <>
          {/* <LikesTransfer /> */}
          <div className="flex flex-col gap-6">
            <LikeBook />
            {VENDOR_CATEGORIES.map((label) => (
              <LikeBookCat
                category={label.value}
                label={label.label}
                key={label.value}
              />
            ))}
          </div>
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

export default kylokloud;
