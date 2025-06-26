import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { VENDOR_CATEGORIES } from "../../../config";
import { Access, CollectionConfig } from "payload/types";
import { User, Vendor } from "../../../payload-types";

const yourOwnVendor: Access = async ({ req }) => {
  const user = req.user as User | null;
  if (!user) return false;
  if (user.role === "admin") return true;

  const { docs: vendors } = await req.payload.find({
    collection: "vendors",
    where: {
      venduserid: {
        equals: user.id,
      },
    },
  });

  const ownVendorIds = vendors.map((vendor) => vendor.id).flat();

  return {
    id: {
      in: ownVendorIds,
    },
  };
};

export const Vendors: CollectionConfig = {
  slug: "vendors",
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  access: {
    create: ({ req }) => req.user.role === "admin",
    read: yourOwnVendor,
    update: yourOwnVendor,
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "venduserid",
      label: "Vendor User ID",
      type: "relationship",
      relationTo: "users",
      access: {
        update: ({ req }) => req.user.role === "admin",
      },
      required: true,
      hasMany: false,
    },
    {
      name: "name",
      label: "Vendor Name",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "category",
      label: "Vendor Category",
      type: "select",
      options: VENDOR_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    // {
    //   name: "details",
    //   type: "richText",
    //   label: "Vendor Details",
    //   required: false,
    // },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      required: false,
    },
    {
      name: "location",
      label: "Vendor Location",
      type: "text",
      required: false,
    },
    {
      name: "facebook",
      label: "Vendor Facebook Link",
      type: "text",
      required: false,
    },
    {
      name: "instagram",
      label: "Vendor Instagram Link",
      type: "text",
      required: false,
    },
    {
      name: "packages",
      type: "relationship",
      label: "Vendor Package(s)",
      required: false,
      relationTo: "packages",
      hasMany: true,
    },
    {
      name: "link",
      type: "text",
      required: false,
      label: "Showcase Link",
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "clicks",
      type: "number",
      required: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "likes",
      type: "number",
      required: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "visible",
      defaultValue: false,
      required: false,
      type: "checkbox",
      access: {
        update: ({ req }) => req.user.role === "admin",
      },
    },
  ],
};
