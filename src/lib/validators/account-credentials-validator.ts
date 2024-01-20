// This defines an authentication credentials validator using Zod

import { z } from "zod"

export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, {
            message: 
            "Password must be at least 8 characters long.",
        }),
})

// Defines a type alias for the inferred type from the validation schema
export type TAuthCredentialsValidator = z.infer<
    typeof AuthCredentialsValidator
>