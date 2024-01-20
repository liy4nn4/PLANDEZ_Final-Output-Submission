// Imports AppRouter and createTRPCReact from the @trpc/react-query library and the application router.
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from ".";

// Creates tRPC hooks for the specified AppRouter
export const trpc = createTRPCReact<AppRouter>({})