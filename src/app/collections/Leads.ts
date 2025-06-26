import { CollectionConfig } from "payload/types";

export const Leads: CollectionConfig = {
  slug: "leads",
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
      relationTo: "vendors",
      required: true,
      hasMany: false,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "contact",
      label: "Contact",
      type: "text",
      required: true,
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: false,
    },
    {
      name: "source",
      label: "Source",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      required: true,
      // options: [
      //   { label: "Not Contacted", value: "not contacted" },
      //   { label: "Warm", value: "warm" },
      //   { label: "Hot", value: "hot" },
      //   { label: "Cold", value: "cold" },
      //   { label: "Lead Not Responding", value: "lnr" },
      //   { label: "Not Interested", value: "not interested" },
      //   { label: "Contract Signed (Closed)", value: "contract signed" },
      // ],
    },
    {
      name: "priority",
      label: "Priority",
      type: "text",
      required: true,
      // options: [
      //   { label: "Low", value: "low" },
      //   { label: "Medium", value: "medium" },
      //   { label: "High", value: "high" },
      // ],
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      required: false,
    },
    {
      name: "chat",
      type: "relationship",
      relationTo: "chats",
      required: false,
      hasMany: false,
    },
  ],
};
