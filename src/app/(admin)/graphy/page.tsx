import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import Graphs from "@/components/graphs/Graphs";

const Graphy = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <MaxWidthWrapper className="space-y-4 pt-6">
        <div className="flex items-center justify-between space-y-2 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Greetings my Ning Ga,{" "}
              <span className="text-sky-500">{user?.name}</span>!
            </h2>
          </div>
        </div>
      </MaxWidthWrapper>
      {user && user.role === "admin" ? (
        <Graphs />
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
      ;
    </>
  );
};

export default Graphy;
