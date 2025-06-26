"use client";

import { User } from "@/payload-types";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { trpc } from "@/trpc/client";

interface SyncedUserProps {
  users: User[];
  userId: string;
  planId: string;
}

const SyncedUser = ({ users, userId, planId }: SyncedUserProps) => {
  const removeUser2 = trpc.removeUser2.useMutation();

  return (
    <>
      {userId === users[0].id ? (
        <div className="flex gap-2 items-center">
          <Input
            id="user2"
            value={"Synced With: " + users[1].email}
            className="text-center"
            disabled
          />
          <Button
            variant="secondary"
            className="bg-red-300"
            onClick={() => {
              removeUser2.mutate({
                planId: planId,
                user1: userId,
              });
              toast({
                title: "I hope it's all good",
                description: "Successfully Unsynced",
              });
            }}
          >
            Unsync
          </Button>
        </div>
      ) : (
        <Input
          id="user2"
          value={"Synced With: " + users[0].email}
          className="text-center"
          disabled
        />
      )}
    </>
  );
};

export default SyncedUser;
