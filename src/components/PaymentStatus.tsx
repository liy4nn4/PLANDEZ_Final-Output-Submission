// This component is used to show the order status, whether payment 
// was successful or pending. 

"use client"

import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Interface defining the props for the PaymentStatus component
interface PaymentStatusProps {
    orderEmail: string,
    orderId: string,
    isPaid: boolean,
}

// PaymentStatus component to display the payment status and order information
const PaymentStatus = ({ 
    orderEmail, 
    orderId, 
    isPaid
} :PaymentStatusProps) => {

    // Accessing Next.js router
    const router = useRouter()

    // Fetching payment status using trpc client
    const { data } = trpc.payment.pollOrderStatus.useQuery(
        { orderId }, 
        {
            // Enabling polling only if payment is not successful
            enabled: isPaid === false,
            // Configuring refetch interval based on payment status
            refetchInterval: (data) => (data?.isPaid ? false : 1000)
        }
    )

    // Effect to refresh the page when payment is successful
    useEffect(() => {
        if(data?.isPaid) router.refresh()
    }, [data?.isPaid, router])

    return (
        <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
                <p className="font-medium text-gray-900"> 
                    Shipping to
                </p>
                <p>
                    {orderEmail}
                </p>
            </div>

            <div>
                <p className="font-medium text-gray-900"> 
                    Order Status
                </p>
                <p>
                    {isPaid ? "Payment successful" : "Pending payment"}
                </p>
            </div>
        </div>
    )
}

export default PaymentStatus