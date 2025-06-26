import { BadgeCheck } from "lucide-react";
import React from "react";

const BadgeLegend = () => {
  return (
    <div className="flex flex-row gap-10 py-10">
      <div>
        <h3 className="flex items-center gap-1 font-medium text-xs text-gray-700">
          Sarang Sayang
          <span>
            <BadgeCheck
              aria-hidden="true"
              className="h-4 w-4 flex-shrink-0 text-yellow-400"
            />
          </span>
        </h3>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Supervendor</h3>
          <p className="text-xs text-muted-foreground">Desc</p>
        </div>
      </div>
      <div>
        <h3 className="flex items-center gap-1 font-medium text-xs text-gray-700">
          Sarang Sayang
          <span>
            <BadgeCheck
              aria-hidden="true"
              className="h-4 w-4 flex-shrink-0 text-blue-400"
            />
          </span>
        </h3>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Official Vendor</h3>
          <p className="text-xs text-muted-foreground">Desc</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeLegend;
