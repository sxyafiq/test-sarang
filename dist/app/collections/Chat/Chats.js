"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chats = void 0;
exports.Chats = {
    slug: "chats",
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
            relationTo: "vendors",
            required: true,
            hasMany: false,
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
        },
    ],
};
