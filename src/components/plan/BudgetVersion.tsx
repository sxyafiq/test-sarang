"use client";

import React, { ChangeEvent, SetStateAction, useState } from "react";
import BudgetScoreboardCont from "./BudgetScoreboardCont";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import BudgetPull from "./BudgetPull";
import { trpc } from "@/trpc/client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import HomepageAds from "../HomepageAds";

interface BudgetVersionProps {
  planId: string;
  version?: number;
}

const BudgetVersion = ({ planId, version }: BudgetVersionProps) => {
  const [bfor, setFor] = useState("");
  const [bcat, setCat] = useState("");
  const [bdetails, setDetails] = useState("");
  const [plannedCost, setPlannedCost] = useState(0);
  const [actualCost, setActualCost] = useState(0);

  const handleDetails = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDetails(event.target.value);
  };

  const handlePlanned = (event: ChangeEvent<HTMLInputElement>) => {
    setPlannedCost(event.target.valueAsNumber);
  };

  const handleActual = (event: ChangeEvent<HTMLInputElement>) => {
    setActualCost(event.target.valueAsNumber);
  };

  const add = trpc.addBudget.useMutation();

  return (
    <>
      {/* <p>Plan ID: {planId}</p>
      <p>Version: {version ? version : "Original"}</p> */}
      {version ? (
        <BudgetScoreboardCont planId={planId} version={version} />
      ) : (
        <BudgetScoreboardCont planId={planId} version={1} />
      )}

      <MaxWidthWrapper>
        <HomepageAds />
      </MaxWidthWrapper>

      <div className="w-full flex flex-row justify-center items-center p-4 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-cyan-100">
        <Image
          src="https://i.giphy.com/media/26nfp8HGGHLPGY2KQ/giphy.gif"
          alt="CountingBudget"
          width={480}
          height={360}
          className="px-4 hidden lg:block"
        />
        <div className="grid grid-cols-4 gap-5 w-full py-6 md:px-6">
          <div className="col-span-4">
            <Input
              placeholder="Add details"
              value={bdetails}
              onChange={(e) => handleDetails(e)}
            />
          </div>

          <div className="col-span-4 md:col-span-2">
            <div className="grid w-full items-center gap-1.5">
              <Label>Category</Label>
              <Select value={bfor} onValueChange={setFor}>
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
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Planned Cost</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Button disabled className="bg-slate-600">
                  $
                </Button>
                <Input
                  className="w-full"
                  type="number"
                  value={plannedCost}
                  onChange={(e) => handlePlanned(e)}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Actual Cost</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Button disabled className="bg-slate-600">
                  $
                </Button>
                <Input
                  className="w-full"
                  type="number"
                  value={actualCost}
                  onChange={(e) => handleActual(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-10">
          {version && version > 1 ? (
            <PlusCircle
              onClick={() => {
                add.mutate({
                  planId: planId,
                  for: bfor,
                  cat: "-",
                  details: bdetails,
                  plannedCost: plannedCost,
                  actualCost: actualCost,
                  ver: version,
                });
                setFor("");
                setCat("");
                setDetails("");
                setPlannedCost(0);
                setActualCost(0);
              }}
              className="cursor-pointer text-slate-400 hover:text-slate-600"
            />
          ) : (
            <PlusCircle
              onClick={() => {
                add.mutate({
                  planId: planId,
                  for: bfor,
                  cat: "-",
                  details: bdetails,
                  plannedCost: plannedCost,
                  actualCost: actualCost,
                });
                setFor("");
                setCat("");
                setDetails("");
                setPlannedCost(0);
                setActualCost(0);
              }}
              className="cursor-pointer text-slate-400 hover:text-slate-600"
            />
          )}
        </div>
      </div>

      {version ? (
        <BudgetPull planId={planId} version={version} />
      ) : (
        <BudgetPull planId={planId} version={1} />
      )}
    </>
  );
};

export default BudgetVersion;
