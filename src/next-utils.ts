/** This code configures and initializes a Next.js 
 * application using the next package. It sets up 
 * the application to run in development mode if 
 * the environment is not in production, and
 *  specifies the port for the application. */

import next from "next"

const PORT = Number(process.env.PORT) || 3000

export const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT
})

export const nextHandler = nextApp.getRequestHandler()