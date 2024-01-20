// This Home component represents the landing page of the application, showcasing 
// product reels and perks in the platform. It utilizes MaxWidthWrapper, ProductReel,
// and ohter UI components for styling and content presentation.

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { 
  buttonVariants, 
  Button 
} from "@/components/ui/button";
import { Truck, CheckCircle, Gem } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: Truck,
    description: "Receive your premium bag selections instantly and embrace a luxurious style.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description: "Quality assured with unparalleled excellence. Not happy? We offer a 7-day refund guarantee.",
  },
  {
    name: "Exclusive Releases",
    Icon: Gem,
    description: "We offer special, limited-edition bag releases to create a sense of exclusivity and urgency.",
  },
  
]

// Home component represents the landing page
export default function Home() {
  return (
    <>
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3x1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to {' '}
          <span className="text-red-600"> 
            SVELTE 
          </span>
          . 
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
        Your marketplace for {' '}
        <span className="text-red-600">high-quality</span>
        {' '} bags.
        </p>
      </div>
      <ProductReel 
        query={{sort: "desc", limit: 4}} 
        href="/products" 
        title="Our collections" 
      />
      <ProductReel 
        query={{category: "brand-new-bags", limit: 4}} 
        href="/products" 
        title="Brand-new" 
      />
      <ProductReel 
        query={{category: "pre-owned-bags", limit: 4}} 
        href="/products" 
        title="Pre-owned" 
      />
    </MaxWidthWrapper>
    
    <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-20">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 text-red-900">
                  {<perk.Icon className="w-1/3 h-1/3"/>}
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
    </>

    
  )
}
