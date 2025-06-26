"use client";

import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { sendDSVEmail } from "@/actions/sendDSVEmail";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories } from "@/app/data/data";
import { Button } from "./ui/button";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { Vendor } from "@/payload-types";
import { toast } from "./ui/use-toast";

interface MiscPullProps {
  category: string;
  title: string;
  user?: string;
}

const MiscPull = ({ category, title, user }: MiscPullProps) => {
  const [dsvData, setDSVData] = useState({
    name: "",
    email: "",
    category: "",
  });

  const results = trpc.getMiscVendors.useQuery({
    category: category,
  });

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Link
                href="#"
                className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
              >
                Don&apos;t see your vendor
                <span aria-hidden="true">?</span>
              </Link>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Don&apos;t see your vendor?</DialogTitle>
                <DialogDescription>
                  Be a part of Sarang Sayang! Submit your vendor info and our
                  team will contact you shortly.
                </DialogDescription>
              </DialogHeader>
              <form
                action={async (dsvData) => {
                  await sendDSVEmail(dsvData);
                }}
              >
                <div className="flex items-center space-x-2 pb-4">
                  <div className="grid flex-1 gap-3">
                    <div>
                      <Label htmlFor="name">Vendor Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={dsvData.name}
                        onChange={(e) => {
                          setDSVData({
                            ...dsvData,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <Label>Vendor Category</Label>
                      <Select
                        name="category"
                        value={dsvData.category}
                        onValueChange={(e) => {
                          setDSVData({
                            ...dsvData,
                            category: e,
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              value={category.label}
                              key={category.value}
                            >
                              <div className="flex items-center gap-3">
                                <p className="text-slate-500 font-light">
                                  {category.icon}
                                </p>
                                <p className="font-light">{category.label}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="email">Vendor Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={dsvData.email}
                        onChange={(e) => {
                          setDSVData({
                            ...dsvData,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() =>
                        toast({
                          title: "We'll get right on it!",
                          description:
                            "Verifications and authentications can take up to 1-2 working days.",
                        })
                      }
                    >
                      Submit
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {/* @ts-ignore */}
            {results.data?.map((product: Vendor) => (
              <ProductListing
                key={product.id}
                //@ts-ignore
                index={product.id}
                vendor={product}
                user={user}
              />
            ))}
            {/* {JSON.stringify(results.data)} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiscPull;
