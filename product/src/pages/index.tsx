import React from 'react'
import type { NextPage } from 'next'
import {Box, Flex, Spinner} from '@chakra-ui/react'
import ProductDetails from '@components/ProductDetails'
import { Product } from '@types'
import dynamic from 'next/dynamic'

const topProduct: Product = {
  "name": "Presentation",
  "price": 1.5,
  "image": "https://thegrocery-prod.s3.amazonaws.com/products/04bd48e9-d3bf-45a5-ac28-5ed2be61cfe2.jpg"
}

const useDynamicScript = (url: string) => {
  const [isReady, setIsReady] = React.useState(false)
  const [isFailed, setIsFailed] = React.useState(false)
  const [isDOMReady, setIsDOMReady] = React.useState(false)

  React.useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = true

    document.head.appendChild(script)

    script.addEventListener('load', () => {
      setIsReady(() => true)

      window.addEventListener('load', () => {
        console.log('called')
        setIsDOMReady(() => true)
      })

      console.log('here')
    })

    script.addEventListener('error', () => {
      setIsFailed(() => true)
      setIsReady(() => true)  
    })

    return () => {
      setIsFailed(() => false)
      setIsReady(() => false)
      document.head.removeChild(script)
    }
  }, [url, setIsFailed, setIsReady])

  return {
    isDOMReady,
    isReady,
    isFailed,
  }
}

const Home: NextPage = () => {
  const {isFailed, isReady, isDOMReady} = useDynamicScript('http://localhost:3000/header.js')
  // const Header = React.useMemo(async () => {
  //   if(!isFailed && !isReady){
  //     return
  //   }

  //   return dynamic(() => global.Headers.get('./Header').then(factory => factory()))
  // }, [isFailed, isReady])

  //   global[scope].init(
  //     Object.assign(
  //       {
  //         react: {
  //           get: () => Promise.resolve(() => require("react")),
  //           loaded: true,
  //         },
  //       },
  //       global.__webpack_require__ ? global.__webpack_require__.o : {}
  //     )
  //   );
  
  // }, [isReady, isFailed])

  if(!isReady || !isDOMReady) {
    return <Spinner/>
  }

  if(isFailed) {
    return <Box>Failed to load...</Box>
  }
  
  const Header = dynamic(() => import('@chakra-ui/react').then(module => {
    return global.header.get('./Header')
  }).then(module => {
    console.log('module', module)
    
    return import(module)
  }), {
    ssr: false
  })

  console.log('HEADER: ', Header)

  return (
    <Flex p="2rem">
      <Header/> 
      <ProductDetails product={topProduct}/>
    </Flex>
  )
}

export default Home
