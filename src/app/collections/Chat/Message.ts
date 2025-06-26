import { CollectionConfig } from "payload/types";

export const Message: CollectionConfig = {
  slug: "message",
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
      name: "chat",
      type: "relationship",
      relationTo: "chats",
      required: true,
      hasMany: false,
    },
    {
      name: "from",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "read",
      type: "checkbox",
      required: true,
    },
  ],
};
