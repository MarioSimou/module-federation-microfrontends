import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

const Footer: React.FC = () => {
    return (
        <Box bg="blue.300" p="1rem 2rem" color="white">
            <Heading fontSize="1.5rem" fontWeight={500} color="inherit" textTransform="lowercase">E-commerce footer</Heading>
        </Box>
    )
} 

export default Footer