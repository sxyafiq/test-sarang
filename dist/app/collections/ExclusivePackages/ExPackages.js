"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExPackages = void 0;
var config_1 = require("../../../config");
exports.ExPackages = {
    slug: "ExPackages",
    admin: {
        useAsTitle: "name",
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    access: {
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        read: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    fields: [
        {
            name: "vendor",
            label: "Package",
            type: "relationship",
            relationTo: "vendors",
            required: true,
            hasMany: false,
        },
        {
            name: "PVendor",
            label: "Participating Vendor",
            type: "relationship",
            relationTo: "vendors",
            required: true,
            hasMany: false,
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
            options: config_1.VENDOR_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
        },
        {
            name: "packageDetails",
            label: "Package Details",
            type: "textarea",
        },
        {
            name: "order",
            label: "Order",
            type: "number",
        },
    ],
};
