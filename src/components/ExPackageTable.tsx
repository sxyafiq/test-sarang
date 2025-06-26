"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExPackage, User, Vendor } from "@/payload-types";
import { VENDOR_CATEGORIES } from "@/config";
import { CheckCheck } from "lucide-react";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ExPackageTableProps {
  pkg: Vendor;
  user: User;
}

const ExPackageTable = ({ pkg, user }: ExPackageTableProps) => {
  const packageList = trpc.getPackageTable.useQuery({
    packageId: pkg.id,
  });

  const vendCatLabel = (string: string) => {
    const category = VENDOR_CATEGORIES.find((cat) => cat.value === string);

    if (!category) {
      return null;
    }

    return category.label;
  };

  if (packageList.isSuccess) {
    const list = packageList.data as unknown as ExPackage[];

    return (
      <>
        <h1 className="text-xl font-bold py-4 w-full">Package Includes</h1>
        <div className=" flex flex-col gap-3">
          {list
            ? list.map((list) => (
                <Card
                  key={list.id}
                  className="w-full shadow-md flex flex-col md:flex-row items-center gap-3 p-5 hover:bg-slate-50"
                >
                  <div className="flex-1 max-w-[300px]">
                    <ProductListing
                      vendor={list.PVendor as Vendor}
                      index={0}
                      user={user.id}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="h-full flex flex-col justify-center items-center">
                      {list.services ? (
                        list.services.map((service: string) =>
                          vendCatLabel(service) ? (
                            <div
                              key={service}
                              className="flex gap-3 items-center justify-center"
                            >
                              <CheckCheck className="w-4 h-4 text-lime-500" />
                              <p className="font-semibold">
                                {vendCatLabel(service)}
                              </p>
                            </div>
                          ) : null
                        )
                      ) : (
                        <p className="text-slate-400 italic">
                          Package Services not disclosed
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                    {list.packageDetails ? (
                      <p className=" text-muted-foreground text-center">
                        {list.packageDetails}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">
                        Package details not disclosed
                      </p>
                    )}
                  </div>
                </Card>
              ))
            : null}
        </div>
      </>
    );
  }
};

export default ExPackageTable;
