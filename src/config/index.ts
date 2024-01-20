// This defines the PRODUCT_CATEGORIES that represent the category of the products
// This  array is structured to accommodate brand-new and pre-owned product 
// categories, each with its own set of featured items.

export const PRODUCT_CATEGORIES = [
    {
        label: "Brand-new",
        value: "brand-new-bags" as const,
        featured: [
            {
                name: "Editor Picks",
                href: "http://localhost:3000/product/65aa06b47e88bb1948abdb1b",
                imageSrc: "/nav/tote-bags/strathberry.jpg",
            },
            {
                name: "New Arrivals",
                href: "http://localhost:3000/product/65a21458fb33f37df8b3b904",
                imageSrc: "/nav/tote-bags/valentino.jpg",
            },
            {
                name: "Best Selling",
                href: "http://localhost:3000/product/65aa072c7e88bb1948abdba5",
                imageSrc: "/nav/tote-bags/guess.jpg",
            },
        ],
    },
    {
        label: "Pre-owned",
        value: "pre-owned-bags" as const,
        featured: [
            {
                name: "Favorite Picks",
                href: "http://localhost:3000/product/65aa08617e88bb1948abdc45",
                imageSrc: "/nav/crossbody-bags/bellroy.png",
            },
            {
                name: "New Arrivals",
                href: "http://localhost:3000/product/65aa0b327e88bb1948abde4c",
                imageSrc: "/nav/crossbody-bags/michael-kors.png",
            },
            {
                name: "Best Selling",
                href: "http://localhost:3000/product/65aa10987e88bb1948abeb45",
                imageSrc: "/nav/crossbody-bags/tory-burch.jpg",
            },
        ]
    }
]