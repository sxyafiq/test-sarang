"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guests = void 0;
exports.Guests = {
    slug: 'guests',
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        }
    },
    access: {
        read: function () { return true; },
        update: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: 'plan',
            type: 'relationship',
            relationTo: 'plans',
            required: true,
            hasMany: false,
        },
        {
            name: 'group',
            type: 'text',
            required: true,
        },
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'pax',
            type: 'number',
            required: true,
        },
        {
            name: 'attendance',
            type: 'text',
            required: true,
        },
        {
            name: 'sent',
            type: 'checkbox',
            defaultValue: false,
            required: true
        }
    ]
};
