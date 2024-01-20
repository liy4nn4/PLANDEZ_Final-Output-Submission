import { getPayloadClient } from "../get-payload";
import { QueryValidator } from "../lib/validators/query-validator";
import { z } from "zod";
import { authRouter } from "./auth-router"
import { publicProcedure, router } from "./trpc"
import { paymentRouter } from "./payment-router";

// Defines the main application router, which includes sub-routers for authentication and payment.
export const appRouter = router({
    auth: authRouter,
    payment: paymentRouter,
     
    // Defines a tRPC query to get infinite products with optional pagination and filtering.
    getInfiniteProducts: publicProcedure.input(z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator
    })).query(async({input}) => {
        const {query, cursor} = input
        const {sort, limit, ...queryOpts} = query

        // Fetches the payload client for database queries
        const payload = await getPayloadClient()

        // Converts query options into the expected format for database queries.
        const parsedQueryOpts: Record<string, {equals: string}> = {}

        Object.entries(queryOpts).forEach(([key, value]) => {
            parsedQueryOpts[key] = {
                equals: value,
            }
        })

        // Sets the pagination parameters based on the provided cursor
        const page = cursor || 1

        // Performs the database query to get products based on the specified criteria
        const { docs: items, hasNextPage, nextPage } = await payload.find({
            collection: "products",
            where: {
                approvedForSale: {
                    equals: "approved",
                },
                ...parsedQueryOpts
            },
            sort,
            depth: 1,
            limit,
            page,
        })

        // Returns the query result, including items and pagination information
        return {
            items,
            nextPage: hasNextPage ? nextPage : null,
        }
    }),
})

// Exports the type of the application router
export type AppRouter = typeof appRouter