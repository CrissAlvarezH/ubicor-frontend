import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import NextAuthRefreshToken from 'middlewares/next-auth-refresh-token'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                <NextAuthRefreshToken>
                    <Component {...pageProps} />
                </NextAuthRefreshToken>
            </ChakraProvider>
        </SessionProvider>
    )
}

export default MyApp
