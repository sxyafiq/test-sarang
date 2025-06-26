import { CollectionConfig } from "payload/types";

export const Likes: CollectionConfig = {
    slug: 'likes',
    admin: {
        hidden: ({ user }) => user.role !== 'admin'
    },
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
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

}