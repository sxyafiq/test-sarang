import { CollectionConfig } from "payload/types";

export const Itinerary: CollectionConfig = {
  slug: "itinerary",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "plan",
      type: "relationship",
      relationTo: "plans",
      required: true,
      hasMany: false,
    },
    {
      name: "date",
      type: "text",
      required: true,
    },
    {
      name: "time",
      type: "number",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
      defaultValue: "-",
    },
    {
      name: "event",
      type: "text",
      required: true,
      defaultValue: "-",
    },
    {
      name: "involved",
      type: "text",
      required: true,
      defaultValue: "-",
    },
    {
      name: "details",
      type: "text",
      required: true,
      defaultValue: "-",
    },
  ],
};
