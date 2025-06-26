"use client";

import { Budget } from "@/payload-types";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Delete } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn, formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";

interface BudgetPullContProps {
  budget: Budget;
}

const BudgetPullCont = ({ budget }: BudgetPullContProps) => {
  const [bFor, setFor] = useState(budget.for);
  const [bCat, setCat] = useState(budget.cat);
  const [bDetails, setDetails] = useState(budget.details);
  const [bPlanned, setPlanned] = useState(budget.plannedCost || 0);
  const [bActual, setActual] = useState(budget.actualCost || 0);
  const [bPaid, setPaid] = useState(budget.amountPaid || 0);

  const [forButton, setForButton] = useState("bg-emerald-200");
  const [catButton, setCatButton] = useState("bg-emerald-200");
  const [detailsButton, setDetailsButton] = useState("bg-emerald-200");
  const [plannedButton, setPlannedButton] = useState("bg-emerald-200");
  const [actualButton, setActualButton] = useState("bg-emerald-200");
  const [paidButton, setPaidButton] = useState("bg-emerald-200");

  const handleDetails = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDetails(event.target.value);
    setDetailsButton("bg-amber-200 ease-in-out duration-300");
  };

  const handlePlanned = (event: ChangeEvent<HTMLInputElement>) => {
    setPlanned(event.target.valueAsNumber);
    setPlannedButton("bg-amber-200 ease-in-out duration-300");
  };

  const handleActual = (event: ChangeEvent<HTMLInputElement>) => {
    setActual(event.target.valueAsNumber);
    setActualButton("bg-amber-200 ease-in-out duration-300");
  };

  const handlePaid = (event: ChangeEvent<HTMLInputElement>) => {
    setPaid(event.target.valueAsNumber);
    setPaidButton("bg-amber-200 ease-in-out duration-300");
  };

  const totalDifference = ((bPlanned - bActual) / bPlanned) * 100;

  const edit = trpc.editBudget.useMutation();

  const del = trpc.removeBudget.useMutation();

  return (
    <TableRow>
      <TableCell className="flex flex-col gap-2">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input value={bDetails} onChange={(e) => handleDetails(e)} />
          <Button
            variant="outline"
            size="icon"
            className={detailsButton}
            onClick={() => {
              edit.mutate({
                id: budget.id,
                details: bDetails,
              });
              setDetailsButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Select
            value={bFor}
            onValueChange={setFor}
            onOpenChange={() =>
              setForButton("bg-amber-200 ease-in-out duration-300")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="For" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>People</SelectLabel>
                <SelectItem value="Bride">Bride</SelectItem>
                <SelectItem value="Groom">Groom</SelectItem>
                <SelectItem value="Bridesmaids">Bridesmaids</SelectItem>
                <SelectItem value="Groomsmen">Groomsmen</SelectItem>
                <SelectItem value="Bride's Family">
                  Bride&#39;s Family
                </SelectItem>
                <SelectItem value="Groom's Family">
                  Groom&#39;s Family
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Event</SelectLabel>
                <SelectItem value="Wedding">Wedding</SelectItem>
                <SelectItem value="Engagement">Engagement</SelectItem>
                <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                <SelectItem value="Photoshoot">Photoshoot</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Misc</SelectLabel>
                <SelectItem value="Others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className={forButton}
            onClick={() => {
              edit.mutate({
                id: budget.id,
                for: bFor,
              });
              setForButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center space-x-1">
          <Input
            type="number"
            value={bPlanned}
            onChange={(e) => handlePlanned(e)}
          />
          <Button
            variant="outline"
            size="icon"
            className={plannedButton}
            onClick={() => {
              edit.mutate({
                id: budget.id,
                plannedCost: bPlanned,
              });
              setPlannedButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        {/* <p>This?</p> */}
        <div className="flex w-full items-center space-x-1">
          <Input
            type="number"
            value={bActual}
            onChange={(e) => handleActual(e)}
          />
          <Button
            variant="outline"
            size="icon"
            className={actualButton}
            onClick={() => {
              edit.mutate({
                id: budget.id,
                actualCost: bActual,
              });
              setActualButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="bg-slate-50">
        <div
          className={cn(
            "flex flex-col items-center font-medium",
            bActual - bPlanned > 0 ? "text-red-600" : "text-lime-600"
          )}
        >
          {formatPrice(bActual - bPlanned)}
          {totalDifference ? (
            <p>
              ({totalDifference.toFixed(2)}
              <span>%</span>)
            </p>
          ) : null}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center space-x-1">
          <Input type="number" value={bPaid} onChange={(e) => handlePaid(e)} />
          <Button
            variant="outline"
            size="icon"
            className={paidButton}
            onClick={() => {
              edit.mutate({
                id: budget.id,
                amountPaid: bPaid,
              });
              setPaidButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="bg-slate-50">
        <div className="flex flex-row items-center justify-center font-medium text-yellow-600">
          <p>{formatPrice(bActual - bPaid)}</p>
          {bActual - bPaid === 0 ? <Check className="h-3" /> : null}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Delete
            className="text-red-400 w-5 h-5 cursor-pointer hover:text-red-600"
            onClick={() =>
              del.mutate({
                id: budget.id,
              })
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BudgetPullCont;
