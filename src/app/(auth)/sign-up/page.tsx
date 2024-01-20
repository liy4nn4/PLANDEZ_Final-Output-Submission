"use client"

import { Icons } from "@/components/Icons"
import Link from "next/link"
import { 
    Button, 
    buttonVariants 
} from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TAuthCredentialsValidator, AuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { ZodError } from "zod"
import { router } from "@/trpc/trpc"
import { useRouter } from "next/navigation"

// Define the Page component for the sign-up page
const Page = () => {

    // Use the useForm hook from react-hook-form to create a form with email and password fields, 
    // and validate the input using the AuthCredentialsValidator schema from 
    // @/lib/validators/account-credentials-validator.
    const { 
        register, 
        handleSubmit, formState: {errors} 
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    // Get the Next.js router
    const router = useRouter()

    // Use the trpc.auth.createPayloadUser.useMutation hook to send a request to create a new user
    const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({
        // Callback when there is an error during user creation
        onError: (err) => {
            if(err.data?.code === "CONFLICT") {
                toast.error(
                    "This email is already in use. Sign in instead."
                )
                return
            }

            // Handle Zod validation errors
            if(err instanceof ZodError) {
                toast.error(err.issues[0].message)

                return
            }

            toast.error(
                "Something went wrong. Please try again."
            )
        },
        // Callback when user creation is successful
        onSuccess: ({sentToEmail}) => {
            toast.success(`Verification email sent to ${sentToEmail}.`)
            // Redirect to the email verification page
            router.push("/verify-email?to=" + sentToEmail)
        }
    })

    // Function to handle form submission
    const onSubmit = ({
        email, 
        password
    }: TAuthCredentialsValidator) => {
        mutate({email, password})
    }

    return(
        <>
            <div className="container relative flex pt-5 pb-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20"/>
                        <h1 className="text-2xl font-bold">
                            Create an account
                        </h1>

                        <Link className={buttonVariants({
                            variant: 'link',
                            className: "gap-1.5"
                            })} 
                            href="/sign-in">
                            Already have an account? Sign-in
                            <ArrowRight className="h-4 w-4"/>
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        {...register("email")}
                                        className={cn({
                                            "focus-visible:ring-red-500": 
                                            errors.email,
                                        })} 
                                        placeholder="you@example.com" 
                                    />
                                    {errors?.email && (
                                        <p className="text-sm text-red-500 italic">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        {...register("password")}
                                        type="password"
                                        className={cn({
                                            "focus-visible:ring-red-500": 
                                            errors.password,
                                    })} 
                                    placeholder="Password" 
                                    />
                                    {errors?.password && (
                                        <p className="text-sm text-red-500 italic">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <Button>Sign up</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page