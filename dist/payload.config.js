"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("payload/config");
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var Users_1 = require("./app/collections/Users");
var Vendors_1 = require("./app/collections/Vendors/Vendors");
var Packages_1 = require("./app/collections/Packages");
var Media_1 = require("./app/collections/Media");
var Likes_1 = require("./app/collections/Likes");
var LikesArchive_1 = require("./app/collections/LikesArchive");
var Leads_1 = require("./app/collections/Leads");
var plugin_cloud_storage_1 = require("@payloadcms/plugin-cloud-storage");
var s3_1 = require("@payloadcms/plugin-cloud-storage/s3");
var Plans_1 = require("./app/collections/Plans/Plans");
var FeaturedVendors_1 = require("./app/collections/FeaturedVendors");
var Todos_1 = require("./app/collections/Plans/Todos");
var Budget_1 = require("./app/collections/Plans/Budget");
var Guests_1 = require("./app/collections/Plans/Guests");
var Itinerary_1 = require("./app/collections/Plans/Itinerary");
var Chats_1 = require("./app/collections/Chat/Chats");
var Message_1 = require("./app/collections/Chat/Message");
var MiscVendors_1 = require("./app/collections/MiscVendors");
var HomepageVendors_1 = require("./app/collections/HomepageVendors");
var Coupons_1 = require("./app/collections/Coupons");
var ExPackages_1 = require("./app/collections/ExclusivePackages/ExPackages");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
var adapter = (0, s3_1.s3Adapter)({
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
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [
        Users_1.Users,
        Vendors_1.Vendors,
        ExPackages_1.ExPackages,
        Packages_1.Packages,
        Media_1.Media,
        Likes_1.Likes,
        Leads_1.Leads,
        LikesArchive_1.LikesArchive,
        Plans_1.Plans,
        FeaturedVendors_1.FeaturedVendors,
        Todos_1.Todos,
        Budget_1.Budget,
        Guests_1.Guests,
        Itinerary_1.Itinerary,
        Chats_1.Chats,
        Message_1.Message,
        MiscVendors_1.MiscVendors,
        HomepageVendors_1.HomepageVendors,
        Coupons_1.Coupons,
    ],
    routes: {
        admin: "/backstage",
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
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
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL,
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
    },
    plugins: [
        (0, plugin_cloud_storage_1.cloudStorage)({
            collections: {
                media: {
                    adapter: adapter,
                },
            },
        }),
    ],
});
