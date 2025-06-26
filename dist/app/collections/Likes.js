"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likes = void 0;
exports.Likes = {
    slug: 'likes',
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        }
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
        },
        {
            name: 'vendor',
            type: 'relationship',
            relationTo: 'vendors',
            required: true,
            hasMany: false,
        },
    ]
};
