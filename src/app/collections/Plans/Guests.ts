import { CollectionConfig } from "payload/types";

export const Guests: CollectionConfig = {
    slug: 'guests',
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
}