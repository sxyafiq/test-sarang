"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
exports.Message = {
    slug: "message",
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
            name: "chat",
            type: "relationship",
            relationTo: "chats",
            required: true,
            hasMany: false,
        },
        {
            name: "from",
            type: "text",
            required: true,
        },
        {
            name: "message",
            type: "textarea",
            required: true,
        },
        {
            name: "read",
            type: "checkbox",
            required: true,
        },
    ],
};
