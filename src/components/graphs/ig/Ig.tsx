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

const Ig = () => {
  const data01 = [
    { post: "Opener", likes: 56, views: 4186, activity: 12 },
    { post: "Teaser", likes: 70, views: 4372, activity: 23 },
    { post: "You Ready?", likes: 39, views: 4453, activity: 6 },
    { post: "What Is SS", likes: 114, views: 6843, activity: 6 },
    { post: "YN1", likes: 91, views: 4343, activity: 14 },
    { post: "YN2", likes: 111, views: 4182, activity: 12 },
    { post: "SH1", likes: 385, views: 23700, activity: 156 },
  ];

  return (
    <>
      <div>
        <h1 className="text-center text-xl p-5 font-semibold">
          Instagram Likes x Instagram Views
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
              name="Instagram Views"
              unit=" views"
            />
            <YAxis
              yAxisId="left"
              type="number"
              dataKey="likes"
              name="Instagram Likes"
              unit=" likes"
            />
            {/* @ts-ignore */}
            <Tooltip content={<CustomTooltip />} />
            <Scatter yAxisId="left" data={data01} fill="#9EDCF6">
              <LabelList dataKey="post" style={{ pointerEvents: "none" }} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h1 className="text-center text-xl p-5 font-semibold">
          Instagram Profile Activity x Instagram Post Views
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
              name="Instagram Views"
              unit=" views"
            />
            <YAxis
              yAxisId="left"
              type="number"
              dataKey="activity"
              name="Instagram Activity"
              unit=" activity"
            />
            {/* @ts-ignore */}
            <Tooltip content={<CustomTooltip2 />} />
            <Scatter yAxisId="left" data={data01} fill="#9EDCF6">
              <LabelList dataKey="post" style={{ pointerEvents: "none" }} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Ig;

// @ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-50 flex flex-col gap-4 rounded-md">
        <p className="text-sm text-blue-400">
          Instagram Likes:
          <span className="ml-2">{payload[1].value}</span>
        </p>
        <p className="text-sm text-blue-400">
          Instagram Views:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};

// @ts-ignore
const CustomTooltip2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-50 flex flex-col gap-4 rounded-md">
        <p className="text-sm text-blue-400">
          Instagram Profile Activity:
          <span className="ml-2">{payload[1].value}</span>
        </p>
        <p className="text-sm text-blue-400">
          Instagram Views:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
