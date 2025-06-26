"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var VerifyUserEmail_1 = require("../../components/emails/users/VerifyUserEmail");
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin")
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token, user = _a.user;
                return (0, VerifyUserEmail_1.VerifyUserEmailHtml)({
                    name: user.name,
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token),
                });
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: function () { return true; },
        update: adminsAndUser,
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
        defaultColumns: ["id"],
        useAsTitle: "email",
    },
    fields: [
        {
            name: "vendor",
            label: "Vendor",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "vendors",
            hasMany: false,
        },
        {
            name: "packages",
            label: "Packages",
            admin: {
                condition: function () { return false; },
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
                condition: function () { return false; },
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
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
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
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
        },
        {
            name: "vendorFirstLog",
            defaultValue: false,
            required: false,
            type: "checkbox",
            access: {
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
        },
    ],
};
