import React from 'react'
import { Box, Heading, Flex, Spinner } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import products from '../data/products'
import ProductCard from './ProductCard'

const Header = React.lazy(() => import('header/Header'))
const Footer = React.lazy(() => import('footer/Footer'))

const App = () => {
    return (
        <ChakraProvider>
            <Flex flexDirection="column" justifyContent="center">
                <React.Suspense fallback={<Spinner m="auto"/>}>
                    <Header/>
                </React.Suspense>
                <Box h="100%" p="2rem" w="100%">
                    <Heading fontSize="1.75rem">Products:</Heading>
                    <Flex gridGap="1rem" mt="1rem">
                        {products.map(product => {
                            return (<ProductCard key={product.name} product={product}/>)
                        })}
                    </Flex>
                </Box>
                <React.Suspense fallback={<Spinner m="auto"/>}>
                    <Footer/>   
                </React.Suspense>
            </Flex>
        </ChakraProvider>
    )
}

export default App