import { CollectionConfig } from "payload/types";

export const Todos: CollectionConfig = {
    slug: 'todos',
    admin: {
        hidden: ({ user }) => user.role !== 'admin'
    },
    access: {
        read: () => true,
        update: () => true,
        create: () => true,
        delete: () => true,
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
}