"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { trpc } from "@/trpc/client";

interface PackageCheckboxProps {
  slcheck: boolean;
  planId: string;
  currentPkg: string;
}

const PackageCheckbox = ({
  slcheck,
  planId,
  currentPkg,
}: PackageCheckboxProps) => {
  const updatePackage = trpc.planAddPackage.useMutation();
  const deletePackage = trpc.planRemovePackage.useMutation();

  const [check, setCheck] = useState(slcheck);

  return (
    <>
      {check === true ? (
        <Checkbox
          checked={check}
          onCheckedChange={() => {
            deletePackage.mutate({
              id: planId,
              packageId: currentPkg,
            });
            setCheck(!check);
          }}
          className="mx-5"
        />
      ) : (
        <Checkbox
          checked={check}
          onClick={() => {
            updatePackage.mutate({
              id: planId,
              packageId: currentPkg,
            });
            setCheck(!check);
          }}
          className="mx-5"
        />
      )}
    </>
  );
};

export default PackageCheckbox;
