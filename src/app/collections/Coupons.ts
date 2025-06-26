import { CollectionConfig } from "payload/types";

export const Coupons: CollectionConfig = {
  slug: "coupons",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "vendor",
      type: "relationship",
      label: "Vendor",
      relationTo: "vendors",
      required: true,
      hasMany: false,
    },
    {
      name: "method",
      type: "select",
      label: "Discount Method",
      required: true,
      hasMany: false,
      options: ["Percentage", "Amount"],
    },
    {
      name: "amount",
      type: "number",
      label: "Discount Amount",
      required: true,
    },
    {
      name: "min",
      type: "number",
      label: "Minimum Purchase",
      required: false,
    },
    {
      name: "expiry",
      type: "date",
      label: "Expiry Date",
      required: false,
    },
  ],
};
