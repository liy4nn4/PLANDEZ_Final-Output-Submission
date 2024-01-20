// This defines a Payload Collection Configuration for the 'orders' collection,
// representing orders on the SVELTE webiste. It includes access control for reading,
// updating, deleting, and creating orders, based on user roles. It also defines fields
// such as '_isPaid', 'user', and 'products' within the 'orders' collection.

import { Access, CollectionConfig } from "payload/types";

// Access control function allowing users to read only their own orders
const yourOwn: Access = ({ req: {user}}) => {
    if(user.role === "admin") return true

    return {
        user: {
            equals: user?.id
        }
    }
}

// Collection Configuration for the 'orders' collection
export const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        // Admin-related configuration for the 'orders' collection in the admin dashboard
        useAsTitle: "Your Orders",
        description: "A summary of all your orders on SVELTE.",
    },
    access: {
        // Access control rules for reading, updating, deleting, and creating orders
        read: yourOwn,
        update: ({ req }) => req.user.role === "admin",
        delete: ({ req }) => req.user.role === "admin",
        create: ({ req }) => req.user.role === "admin",
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            access: {
                read: ({ req }) => req.user.role === "admin",
                create: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            admin: {
                hidden: true,
            },
            relationTo: "users",
            required: true,
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: true,
        }
    ],
}