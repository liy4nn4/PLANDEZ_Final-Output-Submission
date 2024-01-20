/** This initializes the Stripe client using the Stripe SDK.
 * This is used to interact with the Stripe API 
 */

import Stripe from "stripe"

// Initialize the Stripe client with the provided secret key
export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ?? "", 
    {
        apiVersion: "2023-10-16",
        typescript: true,
    }
)