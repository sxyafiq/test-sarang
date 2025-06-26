"use client";

import { trpc } from "@/trpc/client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";

const LikesTransfer = () => {
  const transferLikes = trpc.transferAllLikes.useMutation();

  return (
    <MaxWidthWrapper className="py-6">
      <Button
        className="w-full"
        variant={"destructive"}
        onClick={() =>
          transferLikes.mutate({
            blank: "huhu",
          })
        }
      >
        Transfer Likes
      </Button>
    </MaxWidthWrapper>
  );
};

export default LikesTransfer;
