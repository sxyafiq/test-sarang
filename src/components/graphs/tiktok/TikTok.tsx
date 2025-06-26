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

const TikTok = () => {
  const data01 = [
    { post: "What Is SS", likes: 1154, views: 18000 },
    { post: "YN1", likes: 487, views: 14000 },
    { post: "YN2", likes: 1553, views: 31000 },
    { post: "SH1", likes: 1333, views: 22000 },
  ];

  return (
    <>
      <h1 className="text-center text-xl p-5 font-semibold">
        TikTok Likes x TikTok Views
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
            dataKey="views"
            name="TikTok Views"
            unit=" views"
          />
          <YAxis
            yAxisId="left"
            type="number"
            dataKey="likes"
            name="TikTok Likes"
            unit=" likes"
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

export default TikTok;

// @ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-50 flex flex-col gap-4 rounded-md">
        <p className="text-sm text-blue-400">
          TikTok Likes:
          <span className="ml-2">{payload[1].value}</span>
        </p>
        <p className="text-sm text-blue-400">
          TikTok Views:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
