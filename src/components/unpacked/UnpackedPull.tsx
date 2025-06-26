"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UnpackedClient from "./UnpackedClient";

const UnpackedPull = () => {
  return (
    <Tabs defaultValue="packages">
      <TabsList className="w-full">
        <TabsTrigger value="packages" className="flex-1">
          Packages
        </TabsTrigger>
        <TabsTrigger value="client" className="flex-1">
          Clients
        </TabsTrigger>
      </TabsList>
      <TabsContent value="packages">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="client">
        <UnpackedClient />
      </TabsContent>
    </Tabs>
  );
};

export default UnpackedPull;
