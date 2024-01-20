import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import payload from "payload";

// Router for authentication-related procedures
export const authRouter = router({
    // Creates a payload user based on the provided credentials
    createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({input}) => {
        const { email, password } = input
        const payload = await getPayloadClient()


        // check if user already exists
        const { docs: users } = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                },
            },
        })

        if(users.length !== 0) 
            throw new TRPCError({ code: "CONFLICT"})
        
        await payload.create({
            collection:"users",
            data: {
                email,
                password,
                role: "user",
            },
        })

        return {success: true, sentToEmail: email}
    }),

    // Verifies the email using the provided token
    verifyEmail: publicProcedure
        .input(z.object({token: z.string()}))
        .query(async({ input }) => {
            const {token} = input

            const payload = await getPayloadClient()

            const isVerified = await payload.verifyEmail({
                collection: "users",
                token,
            })

            if (!isVerified) 
                throw new TRPCError({code: "UNAUTHORIZED"})

            return { success: true }
    }),

    // Signs in the user with the provided credentials
    signIn: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input, ctx }) => {
        const { email, password } = input 
        const { res } = ctx

        const payload = await getPayloadClient()

        try {
            await payload.login({
                collection: "users",
                data: {
                    email,
                    password,
                },
                res,
            })

            return {sucess: true}
        } catch (err) {
            throw new TRPCError({ code: "UNAUTHORIZED" })
        }
        }),
})