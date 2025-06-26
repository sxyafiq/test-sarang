import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from "dotenv";
import { Users } from "./app/collections/Users";
import { Vendors } from "./app/collections/Vendors/Vendors";
import { Packages } from "./app/collections/Packages";
import { Media } from "./app/collections/Media";
import { Likes } from "./app/collections/Likes";
import { LikesArchive } from "./app/collections/LikesArchive";
import { Leads } from "./app/collections/Leads";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { Plans } from "./app/collections/Plans/Plans";
import { FeaturedVendors } from "./app/collections/FeaturedVendors";
import { Todos } from "./app/collections/Plans/Todos";
import { Budget } from "./app/collections/Plans/Budget";
import { Guests } from "./app/collections/Plans/Guests";
import { Itinerary } from "./app/collections/Plans/Itinerary";
import { Chats } from "./app/collections/Chat/Chats";
import { Message } from "./app/collections/Chat/Message";
import { MiscVendors } from "./app/collections/MiscVendors";
import { HomepageVendors } from "./app/collections/HomepageVendors";
import { Coupons } from "./app/collections/Coupons";
import { ExPackages } from "./app/collections/ExclusivePackages/ExPackages";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
    region: process.env.S3_REGION || "",
    // ... Other S3 configuration
  },
  bucket: process.env.S3_BUCKET || "",
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [
    Users,
    Vendors,
    ExPackages,
    Packages,
    Media,
    Likes,
    Leads,
    LikesArchive,
    Plans,
    FeaturedVendors,
    Todos,
    Budget,
    Guests,
    Itinerary,
    Chats,
    Message,
    MiscVendors,
    HomepageVendors,
    Coupons,
  ],
  routes: {
    admin: "/backstage",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- SarangSayang",
      favicon: "/favicon.ico",
      ogImage: "/logoSmall.jpg",
    },
    logoutRoute: "/sign-in",
    inactivityRoute: "/sign-in",
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: adapter,
        },
      },
    }),
  ],
});
