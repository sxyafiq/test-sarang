import { trpc } from "@/trpc/client";
import { TableCell, TableRow } from "../ui/table";
import { Delete, Loader2 } from "lucide-react";
import { priorities, statuses } from "@/app/data/data";
import { Sheet, SheetContent } from "../ui/sheet";
import { useState } from "react";
import CRMEditLead from "./CRMEditLead";
import { Skeleton } from "../ui/skeleton";
import { Lead } from "@/payload-types";
import { format } from "date-fns";
import CRMSheetCont from "./CRMSheetCont";

interface CRMDataPullProps {
  vendorId: string;
  role: string;
  sort?: string;
  high: boolean;
  medium: boolean;
  low: boolean;
  cs: boolean;
  ni: boolean;
  lnr: boolean;
  cold: boolean;
  hot: boolean;
  warm: boolean;
  nc: boolean;
}

const CRMDataPull = ({
  vendorId,
  role,
  sort,
  high,
  medium,
  low,
  cs,
  ni,
  lnr,
  cold,
  hot,
  warm,
  nc,
}: CRMDataPullProps) => {
  let leads = [] as Lead[];
  let loaded = false;

  if (!sort) {
    const getLeads = trpc.getLeads.useQuery({
      vendorId: vendorId,
      high: high,
      medium: medium,
      low: low,
      cs: cs,
      ni: ni,
      lnr: lnr,
      cold: cold,
      hot: hot,
      warm: warm,
      nc: nc,
    });
    leads = getLeads.data as unknown as Lead[];
    loaded = getLeads.isSuccess;
  } else if (sort === "source") {
    const getLeads = trpc.getLeads.useQuery({
      vendorId: vendorId,
      sort: sort,
      high: high,
      medium: medium,
      low: low,
      cs: cs,
      ni: ni,
      lnr: lnr,
      cold: cold,
      hot: hot,
      warm: warm,
      nc: nc,
    });
    leads = getLeads.data as unknown as Lead[];
    loaded = getLeads.isSuccess;
  } else if (sort == "priority") {
    const getLeads = trpc.getLeads.useQuery({
      vendorId: vendorId,
      sort: sort,
      high: high,
      medium: medium,
      low: low,
      cs: cs,
      ni: ni,
      lnr: lnr,
      cold: cold,
      hot: hot,
      warm: warm,
      nc: nc,
    });
    leads = getLeads.data as unknown as Lead[];
    loaded = getLeads.isSuccess;
  } else if (sort == "status") {
    const getLeads = trpc.getLeads.useQuery({
      vendorId: vendorId,
      sort: sort,
      high: high,
      medium: medium,
      low: low,
      cs: cs,
      ni: ni,
      lnr: lnr,
      cold: cold,
      hot: hot,
      warm: warm,
      nc: nc,
    });
    leads = getLeads.data as unknown as Lead[];
    loaded = getLeads.isSuccess;
  }

  const removeLead = trpc.removeLead.useMutation();

  const statusAndIcon = (string: string) => {
    const status = statuses.find((status) => status.value === string);

    if (!status) {
      return null;
    }

    return (
      <div className="flex w-[100px] items-center gap-3">
        {status.icon2}
        <span>{status.label}</span>
      </div>
    );
  };

  const priorityAndIcon = (string: string) => {
    const priority = priorities.find((priority) => priority.value === string);

    if (!priority) {
      return null;
    }

    return (
      <div className="flex w-[100px] items-center gap-3">
        {priority.icon2}
        <span>{priority.label}</span>
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState("");

  const isSuperVendor = role === "supervendor";

  return (
    <>
      {!loaded ? (
        // <TableRow>
        <div className="p-10 w-full flex gap-3 justify-center items-center">
          <p className="tracking-tight text-slate-500">Loading</p>
          <Loader2 className="animate-spin text-slate-500" size={10} />
        </div>
      ) : (
        // </TableRow>
        <>
          <Sheet open={open} onOpenChange={setOpen}>
            {/* @ts-ignore */}
            {leads?.map((lead: Lead) =>
              lead.source === "Sarang Sayang" ? (
                isSuperVendor ? (
                  <TableRow
                    key={lead.createdAt}
                    className="cursor-pointer"
                    onClick={() => [
                      setOpen(true),
                      setRowSelection(""),
                      setRowSelection(lead.id),
                    ]}
                  >
                    <TableCell>
                      {format(lead.createdAt, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-3">
                        <p>{lead.name}</p>
                        <p>{lead.email}</p>
                        <p>{lead.contact}</p>
                      </div>
                    </TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>{statusAndIcon(lead.status)}</TableCell>
                    <TableCell>{priorityAndIcon(lead.priority)}</TableCell>
                    <TableCell>{lead.remarks}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={lead.createdAt}>
                    <TableCell>
                      {format(lead.createdAt, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-3">
                        <Skeleton className="w-full h-[30px] rounded-full" />
                        <Skeleton className="w-full h-[30px] rounded-full" />
                        <Skeleton className="w-full h-[30px] rounded-full" />
                      </div>
                    </TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow
                  key={lead.createdAt}
                  className="cursor-pointer"
                  onClick={() => [
                    setOpen(true),
                    setRowSelection(""),
                    setRowSelection(lead.id),
                  ]}
                >
                  <TableCell>{format(lead.createdAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-3">
                      <p>{lead.name}</p>
                      <p>{lead.email}</p>
                      <p>{lead.contact}</p>
                    </div>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{statusAndIcon(lead.status)}</TableCell>
                  <TableCell>{priorityAndIcon(lead.priority)}</TableCell>
                  <TableCell>{lead.remarks}</TableCell>
                  <TableCell>
                    <Delete
                      className="text-rose-400 hover:text-rose-300 cursor-pointer"
                      onClick={() => {
                        removeLead.mutate({
                          leadId: lead.id,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
            <SheetContent side={"bottom"}>
              <CRMSheetCont id={rowSelection} />
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
};

export default CRMDataPull;
