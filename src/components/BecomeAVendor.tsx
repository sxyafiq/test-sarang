"use client";

import Link from "next/link";
import { sendDSVEmail } from "@/actions/sendDSVEmail";
import { useState } from "react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories } from "@/app/data/data";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

interface BecomeAVendorProps {
  desc: string;
  yearly: boolean;
}

const BecomeAVendor = ({ desc, yearly }: BecomeAVendorProps) => {
  const router = useRouter();

  const [dsvData, setDSVData] = useState({
    vendorName: "",
    category: "",
    name: "",
    contact: "",
    email: "",
  });

  const checkUser = trpc.checkUserExist.useQuery({
    email: dsvData.email,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full my-6">
          <p>Become a Vendor Now</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Become a Vendor</DialogTitle>
          <DialogDescription className="text-pretty">{desc}</DialogDescription>
        </DialogHeader>

        <form
          action={async (dsvData) => {
            await sendDSVEmail(dsvData);
          }}
        >
          <div className="flex items-center space-x-2 pb-4">
            <div className="grid flex-1 gap-3">
              <div>
                <Label htmlFor="name">
                  Vendor Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="vendorName"
                  name="vendorName"
                  value={dsvData.vendorName}
                  onChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      vendorName: e.target.value,
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
                      <SelectItem value={category.label} key={category.value}>
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
                <Label htmlFor="name">
                  Name <span className="text-red-400">*</span>
                </Label>
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
                <Label htmlFor="contact">
                  Contact Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  value={dsvData.contact}
                  onChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      contact: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Registered Sarang Sayang Email{" "}
                  <span className="text-red-400">*</span>
                </Label>
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
          <div className="text-center mb-4">
            <p className="text-sm italic text-slate-400">
              User registration is required before proceeding to make payment.
            </p>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              {checkUser.data &&
              checkUser.data.totalDocs === 1 &&
              dsvData.email != "" &&
              dsvData.contact != "" &&
              dsvData.name != "" &&
              dsvData.vendorName != "" ? (
                <>
                  {yearly ? (
                    <Button
                      type="submit"
                      variant="default"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "We'll get right on it!",
                          description:
                            "Verifications and authentications can take up to 1-2 working days.",
                        });
                        router.push(
                          "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-20G56480KN739210AM4LDVAI"
                        );
                      }}
                    >
                      {/* <Link
                        href={
                          "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-20G56480KN739210AM4LDVAI"
                        }
                        target="_blank"
                      > */}
                      Make Payment (Yearly)
                      {/* </Link> */}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="default"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "We'll get right on it!",
                          description:
                            "Verifications and authentications can take up to 1-2 working days.",
                        });
                        router.push(
                          "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-1K953383AM916294WM4LDUBY"
                        );
                      }}
                    >
                      {/* <Link
                        href={
                          "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-1K953383AM916294WM4LDUBY"
                        }
                        target="_blank"
                      > */}
                      Make Payment (Monthly)
                      {/* </Link> */}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  disabled
                >
                  Make Payment
                </Button>
              )}
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeAVendor;
