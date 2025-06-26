import React from "react";
import { TableFooter, TableHead } from "../ui/table";
import { Budget } from "@/payload-types";
import { formatPrice } from "@/lib/utils";

interface BudgetTotalProps {
  budgets: Budget[];
  category: string;
}

const BudgetTotal = ({ budgets, category }: BudgetTotalProps) => {
  const totalPC = (budgets: Budget[]) => {
    let total = 0;

    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].for === category) {
        total = (budgets[i].plannedCost || 0) + total;
      }
    }

    return total;
  };

  const totalAC = (budgets: Budget[]) => {
    let total = 0;

    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].for === category) {
        total = (budgets[i].actualCost || 0) + total;
      }
    }

    return total;
  };

  const totalAP = (budgets: Budget[]) => {
    let total = 0;

    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].for === category) {
        total = (budgets[i].amountPaid || 0) + total;
      }
    }

    return total;
  };

  return (
    <TableFooter>
      <TableHead className="w-[300px]">Total</TableHead>
      <TableHead className="w-[150px]">
        {formatPrice(totalPC(budgets))}
      </TableHead>
      <TableHead className="w-[150px]">
        {formatPrice(totalAC(budgets))}
      </TableHead>
      <TableHead className="bg-slate-200 w-[150px]"></TableHead>
      <TableHead className="w-[150px]">
        {formatPrice(totalAP(budgets))}
      </TableHead>
      <TableHead className="bg-slate-200 w-[150px]"></TableHead>
      <TableHead className="w-[70px]"></TableHead>
      {/* <p>{JSON.stringify(budgets)}</p> */}
    </TableFooter>
  );
};

export default BudgetTotal;
