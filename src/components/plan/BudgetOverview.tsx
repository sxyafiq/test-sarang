"use client";

import { trpc } from "@/trpc/client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Table, TableHead, TableHeader, TableRow } from "../ui/table";
import BudgetOverviewPull from "./BudgetOverviewPull";

interface BudgetOverviewProps {
  totalVer: number;
  planId: string;
}

const BudgetOverview = ({ totalVer, planId }: BudgetOverviewProps) => {
  const resetPlan = trpc.removeItemsFromPlan.useMutation();

  return (
    <>
      {Array.from({ length: totalVer }).map((_, i) => (
        <div className="py-4" key={i}>
          <div className="py-4 flex flex-row justify-between items-center">
            <h1 className="font-semibold text-lg">Plan {i + 1}</h1>

            <Dialog>
              <DialogTrigger>
                <Button variant="destructive">Reset Plan {i + 1}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    I guess it&apos;s time to start over!
                  </DialogTitle>
                  <DialogDescription>
                    Are you absolutely sure? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        resetPlan.mutate({
                          planId: planId,
                          version: i + 1,
                        })
                      }
                    >
                      Reset Plan {i + 1}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>For</TableHead>
                <TableHead className="text-right">Planned Cost</TableHead>
              </TableRow>
            </TableHeader>
            <BudgetOverviewPull planId={planId} version={i + 1} />
          </Table>
        </div>
      ))}
    </>
  );
};

export default BudgetOverview;
