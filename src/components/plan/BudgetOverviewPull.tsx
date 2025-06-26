"use client";

import { Loader2 } from "lucide-react";
import { TableBody, TableCell, TableFooter, TableRow } from "../ui/table";
import { trpc } from "@/trpc/client";
import { formatPrice } from "@/lib/utils";
import BudgetOverviewTotal from "./BudgetOverviewTotal";

interface BudgetOverviewPullProps {
  planId: string;
  version: number;
}

const BudgetOverviewPull = ({ planId, version }: BudgetOverviewPullProps) => {
  const budgets = trpc.getBudget.useQuery({
    planId: planId,
    version: version,
  });

  const results = budgets.data?.docs;

  return (
    <>
      <TableBody>
        {results ? (
          results.map((result, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{result.for}</TableCell>
              <TableCell>{result.details}</TableCell>
              <TableCell className="text-right">
                {result.plannedCost ? formatPrice(result.plannedCost) : "$0"}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <Loader2 className="animate-spin text-blue-400" />
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          {results ? (
            <BudgetOverviewTotal results={results} />
          ) : (
            <TableCell className="text-right">
              <Loader2 className="animate-spin text-blue-400" />
            </TableCell>
          )}
        </TableRow>
      </TableFooter>
    </>
  );
};

export default BudgetOverviewPull;
