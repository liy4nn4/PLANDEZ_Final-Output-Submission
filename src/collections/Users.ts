// This defines a Payload Collection Configuration for the 'users' collection,
// representing user data on the SVELTE website. It includes access control for
// reading, creating, updating, and deleting user data, based on user roles. Admins
// have specific privileges, and certain fields such as 'products' are configured
// for better user experience in the admin dashboard.

import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { Access, CollectionConfig } from "payload/types";

// Defines adminsAndUser, only admins and currently logged in user can view currrently logged in user 
const adminsAndUser: Access = ({ req: { user } }) => {
    if(user.role === "admin") return true

    return {
        id: {
            equals: user.id,
        },
    }
}

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            // Generates HTML for the verification email using the provided token
            generateEmailHTML: ({ token }) => {
                return PrimaryActionEmailHtml({ 
                    actionLabel: "Verify your account",
                    buttonText: "Verify Account",
                    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
                })
            },
        },
    },
    access: {
        // Access control rules for reading, creating, updating, and deleting user data
        read: adminsAndUser,
        create: () => true,
        update: ({req}) => req.user.role === "admin",
        delete: ({req}) => req.user.role === "admin"
    },
    admin: {
        hidden: ({ user }) => user.role !== "admin",
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: () => false
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "role",
            defaultValue: "user",
            required: true,

            type: "select",
            options: [
                {label: "Admin", value: "admin"},
                {label: "User", value: "user"},
            ],
        },
    ],
}