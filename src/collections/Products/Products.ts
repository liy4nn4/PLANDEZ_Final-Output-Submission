// This defines a Payload Collection Configuration for the 'products' collection,
// which represents products available in the marketplace. It includes hooks for user synchronization,
// access control, and Stripe integration for handling product prices.

import {
    AfterChangeHook,
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
  import { PRODUCT_CATEGORIES } from '../../config'
  import { Access, CollectionConfig } from 'payload/types'
  import { Product, User } from '../../payload-types'
  import { stripe } from '../../lib/stripe'

// Hook to add the user ID before creating a new product
const addUser: BeforeChangeHook<Product> = async ({ 
    req, data 
}) => {

    const user = req.user

    return{...data, user: user.id}
}

// Hook to sync product data with the user's profile after a change
const syncUser: AfterChangeHook<Product> = async ({ 
    req, doc 
}) => {
    const fullUser = await req.payload.findByID({
        collection: "users",
        id: req.user.id,
    })

    if(fullUser && typeof fullUser === "object") {
        const { products } = fullUser

        const allIDs = [
            ...(products?.map((product) => 
            typeof product === "object" ? product.id : product
            ) || []),
        ]

        const createdProductIDs = allIDs.filter(
            (id, index) => allIDs.indexOf(id) == index
        )

        const dataToUpdate = [...createdProductIDs, doc.id]

        await req.payload.update({
            collection: "users",
            id: fullUser.id,
            data: {
                products: dataToUpdate,
            },
        })
    }
}

// Access control function to check if the user is an admin or has access to the product
const isAdminOrHasAccess = (): Access => ({req: {user: _user}}) => {
    const user = _user as User | undefined

    if(!user) return false
    if(user.role === "admin") return true

    const userProductIDs = (user.products || []).reduce<Array<string>>((acc, product) => {
        if(!product) return acc
        if(typeof product === "string") {
            acc.push(product)
        } else {
            acc.push(product.id)
        }

        return acc
    }, [])

    return {
        id: {
            in: userProductIDs
        }
    }
}

// Collection Configuration for the 'products' collection
export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name"
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
    },
    hooks:{
        afterChange: [syncUser],
        beforeChange: [addUser, async (args) => {
            // If the user changes the price, the price must change in Stripe
            if(args.operation === "create") {
                const data = args.data as Product

                const createdProduct = await stripe.products.create({
                    name: data.name,
                    default_price_data: {
                        currency: "PHP",
                        unit_amount: Math.round(data.price * 100),
                    },
                })

                const updated: Product = {
                    ...data,
                    stripeId: createdProduct.id,
                    priceId: createdProduct.default_price as string
                }

                return updated
            } 
            else if (args.operation === "update") {
                const data = args.data as Product

                const updatedProduct = await stripe.products.update(data.stripeId!, {
                    name: data.name,
                    default_price: data.priceId!
                })

                const updated: Product = {
                    ...data,
                    stripeId: updatedProduct.id,
                    priceId: updatedProduct.default_price as string
                }

                return updated
            }
        },],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                // Hide field from admin dashboard
                condition: () => false
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            label: "Product Details",
        },
        {
            name: "price",
            label: "Price in PHP",
            min: 0,
            max: 1000000,
            type: "number",
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(
                ({ label, value }) => ({ label, value })
            ),
            required: true,
        },      
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: ({ req }) => req.user.role === "admin",
                read: ({ req }) => req.user.role === "admin",
                update: ({ req }) => req.user.role === "admin",
            },
            options: [
                {
                    label: "Pending verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                }, 
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
         },
         {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
         },
         {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
         },
         {
            name: "images",
            type: "array",
            label: "Product images",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                }, 
            ],
         },
    ],
}