import React from 'react'
import { Box, Spinner, ChakraProvider, VStack } from '@chakra-ui/react'
// import Header from '@components/shared/Header'
// import Footer from '@components/shared/Footer'

type Product = {
    name: string
    price: number
    image: string
}

const topProduct: Product = {
    "name": "Presentation",
    "price": 1.5,
    "image": "https://thegrocery-prod.s3.amazonaws.com/products/04bd48e9-d3bf-45a5-ac28-5ed2be61cfe2.jpg"
}

const ProductCard = React.lazy(() => import('products/components/ProductCard'))
const ProductDetails = React.lazy(() => import('product/components/ProductDetails'))
const Header = React.lazy(() => import('header/Header'))
const Footer = React.lazy(() => import('footer/Footer'))

const App = () => {
    return (
        <ChakraProvider>
            <Box>
                <React.Suspense fallback={<Spinner/>}>
                    <Header/>
                </React.Suspense>
                <VStack h="100%" p="2rem">
                    <React.Suspense fallback={<Spinner/>}>
                        <ProductCard product={topProduct}/>
                    </React.Suspense>
                    <React.Suspense fallback={<Spinner/>}>
                        <ProductDetails product={topProduct}/>
                    </React.Suspense>
                </VStack>
                <React.Suspense fallback={<Spinner/>}>
                    <Footer/>   
                </React.Suspense>
            </Box>
        </ChakraProvider>
    )
}

export default App