import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Maintenance = () => {
  return (
    <MaxWidthWrapper className="mt-10">
      <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
        <div>
          <h1 className="font-bold">Oh no..</h1>
          <p>This part of the site is under maintenance</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Maintenance;
