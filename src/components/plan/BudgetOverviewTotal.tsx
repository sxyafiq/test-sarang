import { Budget } from "@/payload-types";
import { TableCell } from "../ui/table";
import { formatPrice } from "@/lib/utils";

interface BudgetOverviewTotalProps {
  results: Budget[];
}

const BudgetOverviewTotal = ({ results }: BudgetOverviewTotalProps) => {
  let total = 0;

  for (let i = 0; i < results.length; i++) {
    //@ts-ignore
    total = total + results[i].plannedCost;
  }

  return <TableCell className="text-right">{formatPrice(total)}</TableCell>;
};

export default BudgetOverviewTotal;
