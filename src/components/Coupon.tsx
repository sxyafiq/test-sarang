import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vendor } from "@/payload-types";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Loader2 } from "lucide-react";

interface CouponProps {
  vendor?: Vendor;
  method: string;
  amount: number;
  min: number;
  expiry: Date;
  loading?: boolean;
}

const CouponCard = ({
  vendor,
  method,
  amount,
  min,
  expiry,
  loading,
}: CouponProps) => {
  if (loading) {
    return (
      <Card className="py-6 shadow-md bg-gradient-to-b from-cyan-100 to-white">
        <CardHeader className="flex flex-row justify-between">
          <div>
            {/* <Badge variant="secondary" className="animate-pulse">
              Loading
            </Badge> */}
            <CardTitle className="py-2 text-xl animate-pulse">
              Loading
            </CardTitle>
          </div>
          <div>
            <Button
              variant="outline"
              className="px-8 bg-sky-200 transition-all ease-in-out hover:border-sky-400 hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-400/50"
              disabled
            >
              <Loader2 className="animate-spin" />
            </Button>
          </div>
        </CardHeader>
        {/* <CardFooter>
          <p className="text-xs tracking-tight italic text-slate-400">
            Expiring in {format(expiry, "dd-MM-yyy") as string}
          </p>
        </CardFooter> */}
      </Card>
    );
  } else {
    return (
      <Card className="py-6 shadow-md bg-gradient-to-b from-cyan-100 to-white">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <Badge variant="secondary">{vendor?.name}</Badge>
            <CardTitle className="py-2 text-4xl">
              {method === "Percentage"
                ? amount.toString() + "% Off"
                : "$" + amount.toString() + " Off"}
            </CardTitle>
            <CardDescription>
              With a minimum purchase of ${min.toString()}
            </CardDescription>
          </div>
          <div>
            <Button
              variant="outline"
              className="px-8 bg-sky-200 transition-all ease-in-out hover:border-sky-400 hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-400/50"
            >
              Use
            </Button>
          </div>
        </CardHeader>
        <CardFooter>
          <p className="text-xs tracking-tight italic text-slate-400">
            Expiring in {format(expiry, "dd-MM-yyy") as string}
          </p>
        </CardFooter>
      </Card>
    );
  }
};

export default CouponCard;
