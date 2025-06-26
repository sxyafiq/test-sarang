"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscVendors = void 0;
exports.MiscVendors = {
    slug: "misc",
    labels: { plural: "Misc and Pak Andams" },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: "berkat",
            type: "relationship",
            label: "Berkat Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "decor",
            type: "relationship",
            label: "Decor Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "stylist" } },
            hasMany: true,
        },
        {
            name: "agent",
            type: "relationship",
            label: "Agent Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "stylist" } },
            hasMany: true,
        },
        {
            name: "dulang",
            type: "relationship",
            label: "Dulang Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "liveStation",
            type: "relationship",
            label: "Live Station Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "cake",
            type: "relationship",
            label: "Wedding Cake Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "catering",
            type: "relationship",
            label: "Catering Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "pakandam",
            type: "relationship",
            label: "Pak Andam",
            relationTo: "vendors",
            filterOptions: { category: { equals: "mua" } },
            hasMany: true,
        },
        {
            name: "henna",
            type: "relationship",
            label: "Henna Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "stationery",
            type: "relationship",
            label: "Stationery Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: true,
        },
        {
            name: "heels",
            type: "relationship",
            label: "Bridal Heels Vendors",
            relationTo: "vendors",
            filterOptions: { category: { equals: "bridals" } },
            hasMany: true,
        },
    ],
};
