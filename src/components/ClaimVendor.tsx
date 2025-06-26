"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
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
import { sendCTVEmail } from "@/actions/sendCTVEmail";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface ClaimVendorProps {
  vendorName: string;
}

const ClaimVendor = ({ vendorName }: ClaimVendorProps) => {
  const [ctvData, setCTVData] = useState({
    vendor: vendorName,
    name: "",
    contact: "",
    email: "",
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="w-full">
            Claim This Vendor
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form
            action={async (ctvData) => {
              sendCTVEmail(ctvData);
            }}
          >
            <DialogHeader className="mb-6">
              <DialogTitle>Claim this vendor</DialogTitle>
              <DialogDescription className="text-pretty">
                Dis you? Fill up this form and we&#39;ll email you soon!
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 pb-4">
              <div className="grid flex-1 gap-3">
                <div>
                  <Label htmlFor="vendor">Vendor Name</Label>
                  <Input
                    id="vendor"
                    name="vendor"
                    value={vendorName}
                    readOnly
                  />
                </div>

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={ctvData.name}
                    onChange={(e) => {
                      setCTVData({
                        ...ctvData,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={ctvData.contact}
                    onChange={(e) => {
                      setCTVData({
                        ...ctvData,
                        contact: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Vendor Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={ctvData.email}
                    onChange={(e) => {
                      setCTVData({
                        ...ctvData,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              We&#39;re excited to have you on board!{" "}
            </div>
            <DialogFooter className="sm:justify-start mt-4">
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
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
    </>
  );
};

export default ClaimVendor;
