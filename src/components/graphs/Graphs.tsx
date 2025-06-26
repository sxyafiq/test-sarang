"use client";

import MaxWidthWrapper from "../MaxWidthWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebActivity from "./webactivity/WebActivity";
import TikTok from "./tiktok/TikTok";
import Ig from "./ig/Ig";

const Graphs = () => {
  return (
    <Tabs defaultValue="webactivity" className="w-full">
      <TabsList className="w-full bg-sky-200">
        <TabsTrigger value="webactivity">Website Activity</TabsTrigger>
        <TabsTrigger value="tiktok">TikTok</TabsTrigger>
        <TabsTrigger value="ig">IG</TabsTrigger>
      </TabsList>
      <div className="mt-6">
        <MaxWidthWrapper>
          <TabsContent value="webactivity">
            <WebActivity />
          </TabsContent>
          <TabsContent value="tiktok">
            <TikTok />
          </TabsContent>
          <TabsContent value="ig">
            <Ig />
          </TabsContent>
        </MaxWidthWrapper>
      </div>
    </Tabs>
  );
};

export default Graphs;
