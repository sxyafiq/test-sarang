"use client";

import { trpc } from "@/trpc/client";
import CatLikeItem from "./CatLikeItem";
import { categories } from "@/app/data/data";
import { Like, Vendor } from "@/payload-types";
import { Loader2 } from "lucide-react";

interface CategorizedLikesProps {
  userId: string;
}

const CategorizedLikes = ({ userId }: CategorizedLikesProps) => {
  const likes = trpc.getLikes.useQuery({
    userId: userId,
  });

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <section
          className="py-12 px-9 mb-6 bg-gradient-to-r from-pink-100 to-cyan-100 rounded-lg"
          key={category.value}
        >
          {likes && likes.data ? (
            <CatLikeItem
              data={likes.data.docs as Like[]}
              category={category.value}
              icon={category.icon}
              label={category.label}
            />
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </section>
      ))}
    </div>
  );
};

export default CategorizedLikes;
