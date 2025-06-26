"use client";

import { Plan, User } from "@/payload-types";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { trpc } from "@/trpc/client";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import SyncedUser from "./SyncedUser";

interface SyncUsersProps {
  plan: Plan;
  userId: string;
}

const SyncUsers = ({ plan, userId }: SyncUsersProps) => {
  //@ts-ignore
  const [user2, setUser2] = useState("");

  const checkUser = trpc.checkUserExist.useQuery({
    email: user2,
  });

  const addUser2 = trpc.addUser2.useMutation();

  function handleUserChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setUser2(event.target.value);
  }

  return (
    <>
      <Label>Plan Sync</Label>
      {plan.user.length > 1 ? (
        <SyncedUser
          users={plan.user as User[]}
          userId={userId}
          planId={plan.id}
        />
      ) : (
        <>
          <div className="flex gap-2 items-center">
            <Input
              id="user2"
              value={user2}
              className="text-center"
              onChange={handleUserChange}
              placeholder="Enter Partner's User Email"
            />
            {user2 != "" ? (
              checkUser.data && checkUser.data?.docs.length > 0 ? (
                <Button
                  variant="secondary"
                  className="bg-green-300"
                  onClick={() => {
                    addUser2.mutate({
                      planId: plan.id,
                      user1: userId,
                      user2: checkUser.data.docs[0].id,
                    });
                    toast({
                      title: "Nice!",
                      description: `Let's wait for ${user2} to accept your sync request.`,
                    });
                  }}
                >
                  Sync User
                </Button>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="secondary" disabled>
                        Sync User
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user2} is not found</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="secondary" disabled>
                      Sync User
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a registered user</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SyncUsers;
