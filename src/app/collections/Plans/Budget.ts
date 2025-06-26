import { CollectionConfig } from "payload/types";

export const Budget: CollectionConfig = {
  slug: "budget",
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
      name: "ver",
      type: "number",
      required: false,
    },
    {
      name: "for",
      type: "text",
      required: true,
    },
    {
      name: "cat",
      type: "text",
      required: true,
    },
    {
      name: "details",
      type: "text",
      required: true,
      defaultValue: "-",
    },
    {
      name: "plannedCost",
      type: "number",
      required: false,
      defaultValue: 0,
    },
    {
      name: "actualCost",
      type: "number",
      required: false,
      defaultValue: 0,
    },
    {
      name: "amountPaid",
      type: "number",
      required: false,
    },
  ],
};
