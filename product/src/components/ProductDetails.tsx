import React from 'react'
import { Flex, Text, Img, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { Product } from '@types'
import NextLink from 'next/link'

export type Props = {
    product: Product
}

const ProductDetails: React.FC<Props> = ({product}) => {
    return (
        <Flex alignItems="center" border="1px solid grey" w="100%">
            <Img src={product.image} boxSize="100%" maxW="200px" alt={product.name}/>
            <Flex flexDirection="column" bg="blue.100" w="100%" boxSizing="border-box" h="100%" p="1rem" justifyContent="center">
                <Flex alignItems="center">
                    <Heading fontSize="1rem">Product Name:&nbsp;</Heading>
                    <Text>{product.name}</Text>
                </Flex>
                <Flex alignItems="center">
                    <Heading fontSize="1rem">Price:&nbsp;</Heading>
                    <Text>{product.price}&nbsp;$</Text>
                </Flex>
                <Flex alignItems="center">
                    <Heading fontSize="1rem">Image:&nbsp;</Heading>
                    <Text><ChakraLink as={NextLink} isExternal href={product.image}>{product.image}</ChakraLink></Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ProductDetails