// This page component, ProductsPage, receives search parameters and displays a list of products
// based on the sorting and category filters. It utilizes MaxWidthWrapper for styling
// and ProductReel to fetch and display a collection of products. The label for the selected
// category is determined and used as the title for the ProductReel.

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'

type Param = string | string[] | undefined

// Defines the interface for ProductsPageProps, which includes search parameters.
interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

// Function to parse and normalize parameters, returning undefined if not a string.
const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

// ProductsPage component receives search parameters, parses and extracts sorting and category,
// then renders a styled page with a ProductReel displaying products based on the criteria.
const ProductsPage = ({
  searchParams,
}: ProductsPageProps) => {
  // Parses and extracts sorting and category parameters from searchParams
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  // Determine the label for the selected category from PRODUCT_CATEGORIES
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  // Render the page with MaxWidthWrapper and ProductReel components
  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? 'Browse high-quality bags'}
        query={{
          category,
          limit: 40,
          sort:
            sort === 'desc' || sort === 'asc'
              ? sort
              : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage