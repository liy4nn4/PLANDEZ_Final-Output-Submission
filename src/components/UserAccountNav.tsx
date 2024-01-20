// This component is for rendering a user account navigation dropdown menu
// This uses the dropdown menu which includes the user's email, link to the
// seller dashboard and a logout option 

"use client"

import { useAuth } from "@/hooks/use-auth"
import { User } from "@/payload-types"
import Link from "next/link"
import { Button } from "./ui/button"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

// UserAccountNav component for rendering user account navigation
const UserAccountNav = ({ user } : { user: User }) => {
    // Destructuring the signOut function from the useAuth hook
    const { signOut } = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
                asChild 
                className="overflow-visible">
                <Button 
                    variant="ghost" 
                    size="sm"
                    className="relative">
                        My Account
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-.05 leading-none">
                        <p className="font-medium text-sm text-black">
                            {user.email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator/>

                <DropdownMenuItem asChild>
                    <Link href="http://localhost:3000/sell">
                        Seller Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem 
                    onClick={signOut}
                    className="cursor-pointer">
                        Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav