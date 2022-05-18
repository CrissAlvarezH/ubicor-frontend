import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Ubicor</title>
        <meta name="description" content="Ubicor web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" justifyContent="center" padding={2}>
        <Text fontSize="4xl">Ubicor web</Text>
      </Box>
    </Box>
  )
}

export default Home
