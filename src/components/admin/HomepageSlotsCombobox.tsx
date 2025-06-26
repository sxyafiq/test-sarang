import { trpc } from "@/trpc/client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { Vendor } from "@/payload-types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface HomepageSlotsComboboxProps {
  setVend: Vendor;
  slot: number;
}

const HomepageSlotsCombobox = ({
  setVend,
  slot,
}: HomepageSlotsComboboxProps) => {
  const queryResults = trpc.getAllPagelessInfiniteProducts.useQuery();

  const setHomepageVendor = trpc.setHomepageVendor.useMutation();

  const vendors = queryResults.data as unknown as Vendor[];

  //const setTop = trpc.setTopVendors.useMutation();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(setVend.name);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {queryResults && vendors ? (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between capitalize"
          >
            {value}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled
          >
            Loading Vendors
            <Loader2 className="opacity-50 animate-spin" size={20} />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full h-[300px] p-0">
        <Command>
          <CommandInput placeholder={"Search vendors..."} />
          <CommandList>
            <CommandEmpty>No vendors found.</CommandEmpty>
            <CommandGroup>
              {vendors ? (
                <>
                  {vendors.map((vendor) => (
                    <CommandItem
                      key={vendor.id}
                      value={vendor.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setHomepageVendor.mutate({
                          vendorId: vendor.id,
                          slot: slot,
                        });
                        setOpen(false);
                      }}
                    >
                      {vendor.name}
                    </CommandItem>
                  ))}
                </>
              ) : (
                <></>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HomepageSlotsCombobox;
