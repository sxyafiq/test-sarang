import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import UnpackedPull from "@/components/unpacked/UnpackedPull";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="my-10">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Unpacked</h4>
          <p className="text-sm text-muted-foreground">
            A quick explanation of Unpacked.
          </p>
        </div>
        <Separator className="my-4" />
        <UnpackedPull />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
