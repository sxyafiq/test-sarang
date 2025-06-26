import { Access, CollectionConfig } from "payload/types";
import { VENDOR_CATEGORIES } from "../../../config";
import { User } from "../../../payload-types";

export const ExPackages: CollectionConfig = {
  slug: "ExPackages",
  admin: {
    useAsTitle: "name",
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    create: ({ req }) => req.user.role === "admin",
    read: ({ req }) => req.user.role === "admin",
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "vendor",
      label: "Package",
      type: "relationship",
      relationTo: "vendors",
      required: true,
      hasMany: false,
    },
    {
      name: "PVendor",
      label: "Participating Vendor",
      type: "relationship",
      relationTo: "vendors",
      required: true,
      hasMany: false,
    },
    {
      name: "services",
      label: "Offered Services",
      type: "select",
      hasMany: true,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: VENDOR_CATEGORIES.map(({ label, value }) => ({ label, value })),
    },
    {
      name: "packageDetails",
      label: "Package Details",
      type: "textarea",
    },
    {
      name: "order",
      label: "Order",
      type: "number",
    },
  ],
};
