"use client";

import { trpc } from "@/trpc/client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Vendor } from "@/payload-types";
import { Card } from "../ui/card";
import TVCCont from "./cards/vendorClicks/TVCCont";
import TECont from "./cards/enquiries/TECont";
import TVLCont from "./cards/vendorlikes/TVLCont";
import CRMCont from "../crm/CRMCont";
import MaxWidthWrapper from "../MaxWidthWrapper";

interface TVCContProps {
  userId: string;
  role: string;
}

const ScoreboardCont = ({ userId, role }: TVCContProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const vendor = trpc.getVendorId.useQuery({
    userId: userId,
  });

  return (
    <div>
      <MaxWidthWrapper>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            {vendor && vendor.data ? (
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {/* @ts-ignore */}
                {value
                  ? vendor.data.docs.find((vendor) => vendor.id === value)?.name
                  : "Select Vendor"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            ) : (
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
                disabled
              >
                Loading
                <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="popover-content-width-full">
            <Command>
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                {vendor && vendor.data ? (
                  <CommandGroup>
                    {vendor.data.docs.map((vendor) => (
                      <CommandItem
                        key={vendor.id}
                        //@ts-ignore
                        value={vendor.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="w-full"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === vendor.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {/* @ts-ignore */}
                        {vendor.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="py-5 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {/* Total Vendor Likes */}
          <Card>
            {value ? (
              <TVCCont vendorId={value} />
            ) : (
              <TVCCont vendorId={value} blank />
            )}
          </Card>

          {/* Total Enquiries */}
          <Card>
            {value ? (
              <TECont vendorId={value} />
            ) : (
              <TECont vendorId={value} blank />
            )}
          </Card>

          {/* Total Vendor Likes */}
          <Card className="col-span-2">
            {value ? (
              <TVLCont vendorId={value} role={role} />
            ) : (
              <TVLCont vendorId={value} role={role} blank />
            )}
          </Card>
        </div>
      </MaxWidthWrapper>
      <CRMCont vendorId={value} role={role} />
    </div>
  );
};

export default ScoreboardCont;
