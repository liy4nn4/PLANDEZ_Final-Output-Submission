// This component handles the email verification process.
// This uses the trpc library for querying the server which
// displays success/error messages based on the verification state

"use client"

import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

// Props interface for the VerifyEmail component
interface VerifyEmailProps {
    token: string
}

const VerifyEmail= ({ token }: VerifyEmailProps) => {
    // Destructuring values from the trpc query result
    const { data, isLoading, isError } = 
        trpc.auth.verifyEmail.useQuery({
            token,
    })

    // Displays when there is an error during verification
    if(isError) {
        return (
            <div className="flex flex-col items-center gap-2">
                <XCircle className="h-8 w-8 text-red-600"/>
                <h3 className="font-semibold text-x1">
                    There was a problem
                </h3>
                <p className="text-muted-foreground">
                    This token is not valid or might be expired.
                    Please try again.
                </p>
            </div>
        )
    }

    // Displays when email verification is successful 
    if(data?.success) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <Image 
                        src="/nav/svelte-sent-email.png"
                        alt="The email was sent"
                        fill
                    />
                </div>
                <h3 className="font-semibold text-2x1">
                    You&apos;re all set!
                </h3>
                <p className="text-muted-foreground text-center mt-1"> 
                    Thank you for verifying your email.
                </p>
                <Link 
                    className={buttonVariants({ className: "mt-4"})} 
                    href="/sign-in">Sign in
                </Link>
            </div>
        )
    }

    // Displays when verificatio process is in progress
    if(isLoading) {
        return (
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin h-8 w-8 text-zinc-300"/>
                <h3 className="font-semibold text-x1">
                    Verifying...
                </h3>
                <p className="text-muted-foreground">
                    This won&apos;t take long.
                </p>
            </div>
        )
    }

    // If no conditions are met, no UI is rendered
    return null;
}

export default VerifyEmail