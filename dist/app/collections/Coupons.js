"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupons = void 0;
exports.Coupons = {
    slug: "coupons",
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
            name: "vendor",
            type: "relationship",
            label: "Vendor",
            relationTo: "vendors",
            required: true,
            hasMany: false,
        },
        {
            name: "method",
            type: "select",
            label: "Discount Method",
            required: true,
            hasMany: false,
            options: ["Percentage", "Amount"],
        },
        {
            name: "amount",
            type: "number",
            label: "Discount Amount",
            required: true,
        },
        {
            name: "min",
            type: "number",
            label: "Minimum Purchase",
            required: false,
        },
        {
            name: "expiry",
            type: "date",
            label: "Expiry Date",
            required: false,
        },
    ],
};
