// This is to handle both GET and POST requests

import { appRouter } from "@/trpc"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

// Defines a handler function that processes incoming HTTP requests
const handler = (req: Request) => {
    // Use fetchRequestHandler from the @trpc/server library to handle the TRPC request
    fetchRequestHandler({
        endpoint: "/api/trpc",                                              // Specifies the endpoint for handling TRPC requests
        req,                                                                // Passes the incoming HTTP request to the handler
        router: appRouter,                                                  // Provides the TRPC router that defines the API's typed routes
        // @ts-expect-error context already passed from express middleware
        createContext: () => ({}),                                          // Creates an empty context
    })
}

// Export the handler function for both GET and POST HTTP methods
export { handler as GET, handler as POST }