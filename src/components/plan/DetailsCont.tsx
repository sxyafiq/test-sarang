"use client";

import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import DetailsPull from "./DetailsPull";
import WantToSync from "./WantToSync";

interface DetailsContProps {
  userId: string;
}

const DetailsCont = ({ userId }: DetailsContProps) => {
  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const likes = trpc.getLikes.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs;

  return (
    <>
      {identifiedPlan && identifiedPlan.length === 1 && likes.data ? (
        <DetailsPull
          plan={identifiedPlan[0]}
          likesData={likes.data.docs}
          userId={userId}
        />
      ) : identifiedPlan ? (
        <WantToSync plans={identifiedPlan} userId={userId} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default DetailsCont;
