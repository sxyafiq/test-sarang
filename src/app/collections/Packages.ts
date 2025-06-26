import { Access, CollectionConfig } from "payload/types";
import { VENDOR_CATEGORIES } from "../../config";
import { Package, User } from "../../payload-types";
import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";

const addUser: BeforeChangeHook<Package> = async ({ req, data }) => {
  const user = req.user;

  return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Package> = async ({ req, doc }) => {
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req.user.id,
  });

  if (fullUser && typeof fullUser === "object") {
    const { packages } = fullUser;

    const allIDs = [
      ...(packages?.map((pkg) => (typeof pkg === "object" ? pkg.id : pkg)) ||
        []),
    ];

    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductIDs, doc.id];

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        packages: dataToUpdate,
      },
    });
  }
};

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    const userPkgIDs = (user.packages || []).reduce<Array<string>>(
      (acc, pkg) => {
        if (!pkg) return acc;
        if (typeof pkg === "string") {
          acc.push(pkg);
        } else {
          acc.push(pkg.id);
        }

        return acc;
      },
      []
    );

    return {
      id: {
        in: userPkgIDs,
      },
    };
  };

export const Packages: CollectionConfig = {
  slug: "packages",
  admin: {
    useAsTitle: "name",
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },
  hooks: {
    beforeChange: [addUser],
    afterChange: [syncUser],
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
      label: "Package Name",
      type: "text",
      required: true,
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
      type: "richText",
    },
    {
      name: "pax",
      label: "Number of Pax",
      type: "number",
    },
    {
      name: "price",
      label: "Price in SGD",
      min: 0,
      max: 100000,
      type: "number",
    },
  ],
};
