"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = void 0;
exports.Todos = {
    slug: 'todos',
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
            name: 'todo',
            type: 'text',
            required: true,
        },
        {
            name: 'remarks',
            type: 'text',
            required: false,
        },
        {
            name: 'date',
            type: 'date',
            required: true,
        },
        {
            name: 'done',
            type: 'checkbox',
            defaultValue: false,
            required: true
        }
    ]
};
