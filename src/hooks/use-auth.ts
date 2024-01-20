// This is a custom hook for useAuth for haldning user authentication-related functionality
//

import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuth = () => {

    // Accessing Next.js router for navigation.
    const router = useRouter()

    // Function to sign out the user
    const signOut = async () => {
        try {
            // Sending a POST request to the server's logout API endpoint
            const res = await 
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }

            );

        // If the response is not okay, throw an error
        if (!res.ok) throw new Error();

        // Displays a success notification
        toast.success("Signed out successfully")
        // Redirects the user to the sign-in page after successful sign-out
        router.push("/sign-in")
        router.refresh()

        } catch (err) {
            // Handles errors by logging to the console and displaying an error toast notification.
            console.error(err);
            toast.error("Coundn't sign out, please try again.")
        }
    }

    // Returns the signOut function for external use
    return {signOut};
}