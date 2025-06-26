"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plans = void 0;
exports.Plans = {
    slug: "plans",
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
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: true,
        },
        {
            name: "totalVer",
            type: "number",
            required: false,
            defaultValue: 0,
        },
        {
            name: "brideName",
            label: "Bride Name",
            type: "text",
            required: false,
        },
        {
            name: "groomName",
            label: "Groom Name",
            type: "text",
            required: false,
        },
        {
            name: "weddingDate",
            label: "Wedding Date",
            type: "date",
            required: false,
        },
        {
            name: "venue",
            label: "Venue of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "agent",
            label: "Agent of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "bridal",
            label: "Bridal of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "photovideo",
            label: "PhotoVideo of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "mua",
            label: "MUA of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "henna",
            label: "Henna of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "emceesperformers",
            label: "Emcees & Performers of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "misc",
            label: "Misc of Choice",
            type: "relationship",
            required: false,
            hasMany: false,
            relationTo: "vendors",
        },
        {
            name: "packages",
            type: "relationship",
            label: "Vendor Package(s)",
            required: false,
            relationTo: "packages",
            hasMany: true,
        },
    ],
};
