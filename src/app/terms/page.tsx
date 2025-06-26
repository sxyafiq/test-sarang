import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const Terms = () => {
  return (
    <MaxWidthWrapper className="flex-1 space-y-4 pt-6 py-20">
      <div className="flex items-center justify-between space-y-2 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Terms and Conditions
          </h2>
          <p className="text-muted-foreground">Terma dan syarat</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Terms;
