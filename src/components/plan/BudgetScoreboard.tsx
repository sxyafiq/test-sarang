"use client";

import { formatPrice } from "@/lib/utils";
import { Budget } from "@/payload-types";

interface BudgetScoreboardProps {
  budgets: Budget[];
}

const BudgetScoreboard = ({ budgets }: BudgetScoreboardProps) => {
  let actual = 0;
  let planned = 0;
  let paid = 0;

  for (let i = 0; i < budgets.length; i++) {
    //@ts-ignore
    actual = actual + budgets[i].actualCost;
    //@ts-ignore
    planned = planned + budgets[i].plannedCost;
    //@ts-ignore
    paid = paid + budgets[i].amountPaid;
  }

  const totalDifference = (actual / planned) * 100;
  const paidPerc = 100 - ((actual - paid) / actual) * 100;

  return (
    <div className="w-full flex flex-col items-center md:flex-row justify-center gap-10 pb-6">
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{formatPrice(planned)}</h1>
        </div>
        <p className="italic text-slate-400">Planned Cost</p>
      </div>
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{formatPrice(actual)}</h1>
          {actual === planned ? null : null}
          {actual != 0 && planned != 0 && actual > planned ? (
            <p className="text-red-500 text-sm">
              {totalDifference.toFixed(2)}
              <span>&#37;</span> of Planned
            </p>
          ) : null}
          {actual != 0 && planned != 0 && actual < planned ? (
            <p className="text-green-500 text-sm">
              {totalDifference.toFixed(2)}
              <span>&#37;</span> of Planned
            </p>
          ) : null}
        </div>
        <p className="italic text-slate-400">Actual Cost</p>
      </div>
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{formatPrice(paid)}</h1>
          {paid != 0 ? (
            <p className="text-yellow-600 text-sm">
              {paidPerc.toFixed(2)}
              <span>&#37;</span> Paid
            </p>
          ) : null}
        </div>
        <p className="italic text-slate-400">Amount Paid</p>
      </div>
    </div>
  );
};

export default BudgetScoreboard;
