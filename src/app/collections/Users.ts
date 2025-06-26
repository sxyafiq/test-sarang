import { VerifyUserEmailHtml } from "../../components/emails/users/VerifyUserEmail";
import { Access, CollectionConfig } from "payload/types";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return VerifyUserEmailHtml({
          name: user.name,
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: adminsAndUser,
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id"],
    useAsTitle: "email",
  },
  fields: [
    {
      name: "vendor",
      label: "Vendor",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "vendors",
      hasMany: false,
    },
    {
      name: "packages",
      label: "Packages",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "packages",
      hasMany: true,
    },
    {
      name: "stripe_customer_id",
      required: false,
      type: "text",
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "role",
      defaultValue: "user",
      required: true,
      access: {
        update: ({ req }) => req.user.role === "admin",
      },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Vendor", value: "vendor" },
        { label: "Standard Supervendor", value: "supervendor" },
      ],
    },
    {
      name: "userFirstLog",
      defaultValue: true,
      required: false,
      type: "checkbox",
      access: {
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "vendorFirstLog",
      defaultValue: false,
      required: false,
      type: "checkbox",
      access: {
        update: ({ req }) => req.user.role === "admin",
      },
    },
  ],
};
