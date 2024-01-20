/** This code defines an asynchronous function, getServerSideUser, 
 * which fetches user information from the server using the provided 
 * cookies. It extracts the token from the cookies, adds it to the 
 * request headers for authorization, and then fetches the user 
 * information from the server endpoint.
 */

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { NextRequest } from "next/server"
import { User } from "../payload-types"

// Asynchronously fetches user information from the server based on the provided cookies
export const getServerSideUser = async (
    cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
    // Extract the token from the cookies
    const token = cookies.get("payload-token")?.value

    // Makes a request to the server to get user information using the token
    const meRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, 
        {
            headers: {
                Authorization: `JWT ${token}`,

            },
        }
    )

    // Parses the JSON response, expecting user information or null
    const { user } = (await meRes.json()) as {user: User | null}

    // Returns an object containing the user information
    return { user }
}