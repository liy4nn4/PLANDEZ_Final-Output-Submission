// This component is for providing context providers like trpc.Provider
// and QueryClientProvider in the website. 
// This initializes a QueryClient for managing the React Query state and
// trpcClient for making trpc requesst with the server URL

"use client"

import { trpc } from "@/trpc/client"
import { QueryClient } from "@tanstack/query-core"
import { PropsWithChildren, useState } from "react"
import { httpBatchLink } from "@trpc/client"
import { QueryClientProvider } from "@tanstack/react-query"

// Providers component to wrap the application with necessary providers
const Providers = ({ children }: PropsWithChildren) => {
    // Initializing state for QueryClient and trpcClient
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => 
        trpc.createClient({
            links: [
                httpBatchLink({
                    // Configuring the server URL for trpc requests
                    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
                    fetch(url, options) {
                        return fetch(url, {
                            ...options,
                            credentials: "include",
                        })
                    },
                }),
            ],
        })
    )

    return (
        // Wrapping the application with trpc and QueryClient providers
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers