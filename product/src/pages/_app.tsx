import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Flex, ChakraProvider  } from '@chakra-ui/react'
import Script from 'next/script'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
