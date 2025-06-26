"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itinerary = void 0;
exports.Itinerary = {
    slug: "itinerary",
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    access: {
        read: function () { return true; },
        update: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: "plan",
            type: "relationship",
            relationTo: "plans",
            required: true,
            hasMany: false,
        },
        {
            name: "date",
            type: "text",
            required: true,
        },
        {
            name: "time",
            type: "number",
            required: true,
        },
        {
            name: "location",
            type: "text",
            required: true,
            defaultValue: "-",
        },
        {
            name: "event",
            type: "text",
            required: true,
            defaultValue: "-",
        },
        {
            name: "involved",
            type: "text",
            required: true,
            defaultValue: "-",
        },
        {
            name: "details",
            type: "text",
            required: true,
            defaultValue: "-",
        },
    ],
};
