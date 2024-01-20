// This component is used to render a list of navigation items based
// on the category of the product. It manages the open/close state of
// eaach category and handles events such as keyboard input and clicks
// outside the nav area

"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { useState, useRef, useEffect } from "react"
import NavItem from "./NavItem"

// NavItems component representing the navigation items in the menu
const NavItems = () => {
    // State to manage the active index of the open category
    const [activeIndex, setActiveIndex] = useState<
        null | number
        >(null)

    // Effect to handle the 'Escape' key press and close the active category
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                setActiveIndex(null)
            }
        }

        document.addEventListener("keydown", handler)

        return () => {
            document.removeEventListener("keydown", handler)
        }
    }, [])
    
    // Check if any category is open
    const isAnyOpen = activeIndex !== null

    // Ref for the navigation element
    const navRef = useRef<HTMLDivElement | null>(null)

    // Custom hook to handle click outside the navigation element
    useOnClickOutside(navRef, () => setActiveIndex(null))

    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {

                const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }

                const isOpen = i === activeIndex

                return (
                    <NavItem 
                        category={category} 
                        handleOpen={handleOpen}
                        isOpen={isOpen}  
                        key={category.value}
                        isAnyOpen={isAnyOpen}
                    />
                )
            })}
        </div>
    )
}

export default NavItems