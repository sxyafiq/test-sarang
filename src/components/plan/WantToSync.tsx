"use client";

import MaxWidthWrapper from "../MaxWidthWrapper";
import { Plan } from "@/payload-types";
import { Button } from "../ui/button";
import { trpc } from "@/trpc/client";

interface WantToSync {
  plans: Plan[];
  userId: string;
}

const WantToSync = ({ plans, userId }: WantToSync) => {
  const accept = trpc.deletePlan.useMutation();
  const reject = trpc.removeUser2.useMutation();

  return (
    <MaxWidthWrapper>
      <div className="w-full rounded-lg p-7 bg-red-300">
        {plans[0].user.length > 1 ? (
          <div>
            <>
              {/* @ts-ignore */}
              {plans[0].user[0].id === userId ? (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="font-bold">
                      {/* @ts-ignore */}
                      Nice! {plans[0].user[1].email} wants to sync with you.
                    </h1>
                    <p className="italic text-slate-600">
                      However, your current plan will be deleted. Are you cool
                      with that?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-green-600 hover:bg-green-500"
                      onClick={() =>
                        accept.mutate({
                          id: plans[1].id,
                        })
                      }
                    >
                      Yes idm! Let&#39;s Sync
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-600"
                      onClick={() =>
                        reject.mutate({
                          planId: plans[0].id,
                          //@ts-ignore
                          user1: plans[0].user[1].id,
                        })
                      }
                    >
                      Nah! Who dis?
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="font-bold">
                      {/* @ts-ignore */}
                      Nice! {plans[0].user[0].email} wants to sync with you.
                    </h1>
                    <p className="italic text-slate-600">
                      However, your current plan will be deleted. Are you cool
                      with that?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-green-600 hover:bg-green-500"
                      onClick={() =>
                        accept.mutate({
                          id: plans[1].id,
                        })
                      }
                    >
                      Yes idm! Let&#39;s Sync
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-600"
                      onClick={() =>
                        reject.mutate({
                          planId: plans[0].id,
                          //@ts-ignore
                          user1: plans[0].user[0].id,
                        })
                      }
                    >
                      Nah! Who dis?
                    </Button>
                  </div>
                </div>
              )}
            </>
          </div>
        ) : (
          <div>
            <>
              {/* @ts-ignore */}
              {plans[1].user[0].id === userId ? (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="font-bold">
                      {/* @ts-ignore */}
                      Nice! {plans[1].user[1].email} wants to sync with you.
                    </h1>
                    <p className="italic text-slate-600">
                      However, your current plan will be deleted. Are you cool
                      with that?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-green-600 hover:bg-green-500"
                      onClick={() =>
                        accept.mutate({
                          id: plans[0].id,
                        })
                      }
                    >
                      Yes idm! Let&#39;s Sync
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-600"
                      onClick={() =>
                        reject.mutate({
                          planId: plans[1].id,
                          //@ts-ignore
                          user1: plans[1].user[1].id,
                        })
                      }
                    >
                      Nah! Who dis?
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="font-bold">
                      {/* @ts-ignore */}
                      Nice! {plans[1].user[0].email} wants to sync with you.
                    </h1>
                    <p className="italic text-slate-600">
                      However, your current plan will be deleted. Are you cool
                      with that?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-green-600 hover:bg-green-500"
                      onClick={() =>
                        accept.mutate({
                          id: plans[0].id,
                        })
                      }
                    >
                      Yes idm! Let&#39;s Sync
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-600"
                      onClick={() =>
                        reject.mutate({
                          planId: plans[1].id,
                          //@ts-ignore
                          user1: plans[1].user[0].id,
                        })
                      }
                    >
                      Nah! Who dis?
                    </Button>
                  </div>
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default WantToSync;
