import React from 'react'
import {VStack, Image, Box, Heading, Text} from '@chakra-ui/react'

const ProductCard = ({product}) => {
    return (
        <VStack border="1px solid grey" borderRadius="0.5rem">
            <Image src={product.image} alt={product.name} boxSize="100%" width="200px" borderTopRadius="0.5rem"/>
            <Box>
                <Heading fontSize="1.25rem">{product.name}</Heading>
                <Text textAlign="center">{product.price.toFixed(2)}</Text>
            </Box>
        </VStack>
    )
}

export default ProductCard