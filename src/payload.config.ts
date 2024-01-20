/** This code sets up the configuration for a Payload CMS application. 
 * It uses MongoDB as the database adapter, sets up collections for 
 * Users, Products, Media, and Orders, and configures various aspects 
 * of the admin interface such as the server URL, admin route, and 
 * meta information */

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv"
import { Products } from "./collections/Products/Products"
// import { ProductFiles } from "./collections/ProductFiles";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Order";

dotenv.config({
    path: path.resolve(__dirname, "../env"),
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [Users, Products, Media, Orders],
    routes:{
        admin: "/sell"
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "- Svelte",
            favicon: "/favicon.ico",
            ogImage: "thumbnail.jpg",
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
})