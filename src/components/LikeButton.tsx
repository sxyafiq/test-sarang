"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Vendor } from "@/payload-types";
import { Heart, Loader2 } from "lucide-react";
import { trpc } from "@/trpc/client";

const LikeButton = ({ vendor, user }: { vendor: Vendor; user: string }) => {
  const { mutate: addLike, isLoading } = trpc.addLike.useMutation();
  const removeLike = trpc.removeLike.useMutation();
  const getQuery = trpc.isLiked.useQuery({
    vendorId: vendor.id,
    userId: user,
  });

  const query = getQuery.data?.docs;

  const isLiked = () => {
    if (user && query) {
      if (query.length === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const heartcolor = isLiked()
    ? "text-blue-500 hover:text-blue-600"
    : "text-gray-400 hover:text-gray-500";

  return (
    <>
      {isLoading || removeLike.isLoading ? (
        <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
      ) : (
        <Heart
          onClick={() => {
            if (isLiked() && query) {
              removeLike.mutate({
                likeId: query[0].id,
              });
            } else {
              addLike({
                vendorId: vendor.id,
                userId: user,
              });
            }
          }}
          aria-hidden="true"
          className={cn("h-6 w-6 flex-shrink-0 cursor-pointer", heartcolor)}
        />
      )}
    </>
  );
};

export default LikeButton;
