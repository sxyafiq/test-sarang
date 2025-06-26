import { CollectionConfig } from "payload/types";

export const HomepageVendors: CollectionConfig = {
  slug: "homepage",
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
      name: "slot1",
      type: "relationship",
      label: "Slot 1",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot2",
      type: "relationship",
      label: "Slot 2",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot3",
      type: "relationship",
      label: "Slot 3",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot4",
      type: "relationship",
      label: "Slot 4",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot5",
      type: "relationship",
      label: "Slot 5",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot6",
      type: "relationship",
      label: "Slot 6",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot7",
      type: "relationship",
      label: "Slot 7",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "slot8",
      type: "relationship",
      label: "Slot 8",
      relationTo: "vendors",
      hasMany: false,
    },
  ],
};
