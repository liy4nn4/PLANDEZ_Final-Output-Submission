/** This middleware is employed in a Next.js application to prevent 
 * logged-in users from accessing the sign-in and sign-out pages. 
 * By checking the user's authentication status and the requested 
 * pathname, it redirects logged-in users away from the sign-in 
 * and sign-out pages to the main page of the application, ensuring 
 * a seamless user experience */

import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";

// This is to not let logged-in user access sign-in and sign-out page
export async function middleware(req: NextRequest) {
    const { nextUrl, cookies } = req
    const { user } = await getServerSideUser(cookies)

    if(
        user && 
        ["/sign-in", "/sign-up"].includes(nextUrl.pathname)
    ) 
        {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/`
            )
        }

    return NextResponse.next()
}