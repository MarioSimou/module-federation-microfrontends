import React from 'react'
import { Text, Box, Heading, Flex, Image, VStack } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Header = React.lazy(() => import('home/Header'))
const Footer = React.lazy(() => import('home/Footer'))

const products = [
    {
        "name": "Salsa Dip",
        "price": 2.0,
        "image": "https://thegrocery-prod.s3.amazonaws.com/products/00dc3d06-ce46-4d89-b96e-70a287f1e144.jpg"
    },
    {
        "name": "Cranberry sauce",
        "price": 1.2,
        "image": "https://thegrocery-prod.s3.amazonaws.com/products/02cbba3d-bf5a-45e7-b978-3488a4fe7569.jpg"
    },
    {
        "name": "Pourgouri",
        "price": 1.5,
        "image": "https://thegrocery-prod.s3.amazonaws.com/products/04bd48e9-d3bf-45a5-ac28-5ed2be61cfe2.jpg"
    }
]

const App = () => {
    return (
        <ChakraProvider>
            <Box>
                <React.Suspense fallback="Loading header...">
                    <Header/>
                </React.Suspense>
                <Box h="100%" p="2rem">
                    <Heading fontSize="1.75rem">Products:</Heading>
                    <Flex gridGap="1rem" mt="1rem">
                        {products.map(product => {
                            return (
                                <VStack key={product.name} border="1px solid grey" borderRadius="0.5rem">
                                    <Image src={product.image} alt={product.name} boxSize="100%" width="200px" borderTopRadius="0.5rem"/>
                                    <Box>
                                        <Heading fontSize="1.25rem">{product.name}</Heading>
                                        <Text textAlign="center">{product.price.toFixed(2)}</Text>
                                    </Box>
                                </VStack>
                            )
                        })}
                    </Flex>
                </Box>
                <React.Suspense fallback="Loading footer...">
                    <Footer/>   
                </React.Suspense>
            </Box>
        </ChakraProvider>
    )
}

export default App