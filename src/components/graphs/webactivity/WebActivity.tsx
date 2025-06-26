import React from "react";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const WebActivity = () => {
  const data01 = [
    { post: "What Is SS", users: 517, peak: 2 },
    { post: "YN1", users: 121, peak: 5 },
    { post: "YN2", users: 77, peak: 5 },
    { post: "SH1", users: 434, peak: 1 },
  ];

  return (
    <>
      <h1 className="text-center text-xl p-5 font-semibold">
        Nearest Day Peaked x Unique Users Online at Peak
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="users"
            name="Unique Users Online"
            unit=" users"
          />
          <YAxis
            yAxisId="left"
            type="number"
            dataKey="peak"
            name="Days to Peak"
            unit=" days"
          />
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Scatter yAxisId="left" data={data01} fill="#9EDCF6">
            <LabelList dataKey="post" style={{ pointerEvents: "none" }} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
};

export default WebActivity;

// @ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-50 flex flex-col gap-4 rounded-md">
        <p className="text-sm text-blue-400">
          Days to Peak:
          <span className="ml-2">{payload[1].value}</span>
        </p>
        <p className="text-sm text-blue-400">
          Unique Users Online:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
