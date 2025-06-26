"use client";

import { trpc } from "@/trpc/client";
import CRMDataPull from "./CRMDataPull";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CRMAddLead from "./CRMAddLead";
import { Button } from "../ui/button";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

interface CRMContProps {
  vendorId: string;
  role: string;
}

const CRMCont = ({ vendorId, role }: CRMContProps) => {
  const [sort, setSort] = useState("");

  const [high, setHigh] = useState(true);
  const [medium, setMedium] = useState(true);
  const [low, setLow] = useState(true);
  const [cs, setCS] = useState(true);
  const [ni, setNI] = useState(true);
  const [lnr, setLNR] = useState(true);
  const [cold, setCold] = useState(true);
  const [hot, setHot] = useState(true);
  const [warm, setWarm] = useState(true);
  const [nc, setNC] = useState(true);

  return (
    <div className="lg:px-16">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">
              <Button
                variant={"ghost"}
                onClick={() => {
                  setSort("");
                }}
              >
                Date Created <ArrowDownUp />
              </Button>
            </TableHead>
            <TableHead className="w-[300px]">Contact Details</TableHead>
            <TableHead className="w-[180px]">
              <Button
                variant={"ghost"}
                onClick={() => {
                  setSort("source");
                }}
              >
                Source
                <ArrowDownUp />
              </Button>
            </TableHead>
            <TableHead className="w-[180px]">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setSort("status");
                    }}
                  >
                    Status
                    <ArrowDownUp />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-[180px]">
                  <div className="bg-slate-50 my-1 p-4 rounded-sm border">
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="cs"
                        checked={cs}
                        onCheckedChange={() => {
                          setCS(!cs);
                        }}
                      />
                      <label
                        htmlFor="cs"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Contract Signed (Closed)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="ni"
                        checked={ni}
                        onCheckedChange={() => {
                          setNI(!ni);
                        }}
                      />
                      <label
                        htmlFor="ni"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Not Interested
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="lnr"
                        checked={lnr}
                        onCheckedChange={() => {
                          setLNR(!lnr);
                        }}
                      />
                      <label
                        htmlFor="lnr"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lead Not Responding
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="cold"
                        checked={cold}
                        onCheckedChange={() => {
                          setCold(!cold);
                        }}
                      />
                      <label
                        htmlFor="cold"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Cold
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="hot"
                        checked={hot}
                        onCheckedChange={() => {
                          setHot(!hot);
                        }}
                      />
                      <label
                        htmlFor="hot"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hot
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="warm"
                        checked={warm}
                        onCheckedChange={() => {
                          setWarm(!warm);
                        }}
                      />
                      <label
                        htmlFor="warm"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Warm
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="nc"
                        checked={nc}
                        onCheckedChange={() => {
                          setNC(!nc);
                        }}
                      />
                      <label
                        htmlFor="nc"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Not Contacted
                      </label>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </TableHead>
            <TableHead className="w-[180px]">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setSort("priority");
                    }}
                  >
                    Priority
                    <ArrowDownUp />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-[110px]">
                  <div className="bg-slate-50 my-1 p-4 rounded-sm border">
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="high"
                        checked={high}
                        onCheckedChange={() => {
                          setHigh(!high);
                        }}
                      />
                      <label
                        htmlFor="high"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        High
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="medium"
                        checked={medium}
                        onCheckedChange={() => {
                          setMedium(!medium);
                        }}
                      />
                      <label
                        htmlFor="medium"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Medium
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id="low"
                        checked={low}
                        onCheckedChange={() => {
                          setLow(!low);
                        }}
                      />
                      <label
                        htmlFor="low"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Low
                      </label>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </TableHead>
            <TableHead className="w-[200px]">Remarks</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendorId ? <CRMAddLead vendorId={vendorId as string} /> : null}
          {vendorId ? (
            <>
              {sort === "" ? (
                <CRMDataPull
                  vendorId={vendorId as string}
                  role={role}
                  high={high}
                  medium={medium}
                  low={low}
                  cs={cs}
                  ni={ni}
                  lnr={lnr}
                  cold={cold}
                  hot={hot}
                  warm={warm}
                  nc={nc}
                />
              ) : null}
              {sort === "source" ? (
                <CRMDataPull
                  vendorId={vendorId as string}
                  role={role}
                  sort={sort}
                  high={high}
                  medium={medium}
                  low={low}
                  cs={cs}
                  ni={ni}
                  lnr={lnr}
                  cold={cold}
                  hot={hot}
                  warm={warm}
                  nc={nc}
                />
              ) : null}
              {sort === "priority" ? (
                <CRMDataPull
                  vendorId={vendorId as string}
                  role={role}
                  sort={sort}
                  high={high}
                  medium={medium}
                  low={low}
                  cs={cs}
                  ni={ni}
                  lnr={lnr}
                  cold={cold}
                  hot={hot}
                  warm={warm}
                  nc={nc}
                />
              ) : null}
              {sort === "status" ? (
                <CRMDataPull
                  vendorId={vendorId as string}
                  role={role}
                  sort={sort}
                  high={high}
                  medium={medium}
                  low={low}
                  cs={cs}
                  ni={ni}
                  lnr={lnr}
                  cold={cold}
                  hot={hot}
                  warm={warm}
                  nc={nc}
                />
              ) : null}
            </>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default CRMCont;
