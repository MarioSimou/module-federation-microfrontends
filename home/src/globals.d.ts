import { Product } from '@types'

declare module "products/components/ProductCard" {
    const ProductCard: React.ComponentType<{product: Product}>
    export default ProductCard
}

declare module window {
    footer: any
}