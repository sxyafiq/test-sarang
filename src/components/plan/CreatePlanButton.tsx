"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";

interface DetailsPullProps {
  userId: string;
}

const CreatePlanButton = ({ userId }: DetailsPullProps) => {
  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs[0];

  return (
    <>
      {identifiedPlan ? (
        <Button variant="ghost" asChild>
          <Link href="/plan/details">
            Continue Planning{" "}
            <MoveRight className="ml-3 h-4 w-4 transition-all text-muted-foreground" />
          </Link>
        </Button>
      ) : (
        <>
          <Button variant="ghost" disabled>
            Continue Planning{" "}
            <Loader2 className="ml-3 h-4 w-4 animate-spin text-muted-foreground" />
          </Button>
        </>
      )}
    </>
  );
};

export default CreatePlanButton;
