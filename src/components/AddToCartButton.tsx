// This component represents a button for adding a product to the shopping cart.
// It uses the 'useCart' hook to interact with the shopping cart functionality. The button
// changes its text to "Added!" temporarily upon successful addition of product to cart.

"use client"

import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const AddToCartButton = ({ product }: {product: Product}) => {

    // Accesses the 'addItem' function from the 'useCart' hook
    const { addItem } = useCart()

    // State to track the success status of adding the product to the cart
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    // Effect to clear the success status after a timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        // Cleanup function to clear the timeout on unmount or state change
        return () => clearTimeout(timeout)
    }, [isSuccess])
    

    return (
        <Button 
        onClick={() => {
            addItem(product)
            setIsSuccess(true)
        }} 
        size="lg" 
        className="w-full">
        {isSuccess ? "Added!" : "Add to Cart"}
        </Button>
    )
}

export default AddToCartButton