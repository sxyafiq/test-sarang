"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { trpc } from "@/trpc/client";

interface BudgetNewButtonProps {
  planId: string;
}

const BudgetNewButton = ({ planId }: BudgetNewButtonProps) => {
  const add = trpc.addNewBudgetVersion.useMutation();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => {
              add.mutate({ planId: planId });
            }}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add a new plan!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BudgetNewButton;
