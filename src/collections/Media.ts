// This file defines a Payload Collection Configuration for the 'media' collection,
// representing media files such as images uploaded in the website. 
// Here, it includes access control, hooks for
// adding user information before change, and configuration for media uploads.

import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

// Access control function to check if the user is an admin or has access to the images
const isAdminOrHasAccessToImages = (): Access => async ({
    req
}) => {
    const user = req.user as User | undefined

    if(!user) return false                      // Only allow access to images if user is logged in
    if(user.role === "admin") return true       

    // Only you can see your own images 
    return {
        user: {
            equals: req.user.id
        },
    }
}

// Collection Configuration for the 'media' collection
export const Media: CollectionConfig = {
    slug: "media",
    hooks: {
        // Hook to add the user ID before changing the media
        beforeChange: [
            ({req, data}) => {
                return {...data, user: req.user.id}
            },
        ],
    },
    access: {
        read: async ({ req }) => {
            const referer = req.headers.referer

            // If the user is in the front-end or not in the 'sell' section, allow them to see all images
            // If the user is in the backend and in the 'sell' section, check additional access controls
            if(!req.user || !referer?.includes("sell")) {
                return true
            }

            return await isAdminOrHasAccessToImages()({ req })
        },
        delete: isAdminOrHasAccessToImages(),           // Only the suser can delete their own images
        update: isAdminOrHasAccessToImages(),           // Only the user can update trheir own images
    },
    admin: {
        // Hide the 'media' collection in the admin dashboard for non-admin users
        hidden: ({ user }) => user.role !== "admin",
    },
    upload: {
        // Configuration for media uploads
        staticURL: "/media",
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
            },
        ],
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
    ],
}