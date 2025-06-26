import { CollectionConfig } from "payload/types";

export const Chats: CollectionConfig = {
  slug: "chats",
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
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
  ],
};
