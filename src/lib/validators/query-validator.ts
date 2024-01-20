// This uses ZOd to create a validation scheme for query parameters

import { z } from "zod";

// Defines a validation schema for query parameters using Zod
export const QueryValidator =  z.object({
    category: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    limit: z.number().optional(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>