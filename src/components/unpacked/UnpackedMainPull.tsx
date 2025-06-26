"use client";

import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Separator } from "../ui/separator";
import UnpackedPull from "./UnpackedPull";

const UnpackedMainPull = () => {
  return (
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
  );
};

export default UnpackedMainPull;
