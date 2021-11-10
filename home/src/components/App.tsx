import React from 'react'
import { Text, Box } from '@chakra-ui/react'
import Header from './shared/Header'
import Footer from './shared/Footer'
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <ChakraProvider>
            <Box>
                <Header/>
                <Box h="100%" p="2rem">
                    <Text>content of the page</Text>                
                </Box>
                <Footer/>   
            </Box>
        </ChakraProvider>
    )
}

export default App