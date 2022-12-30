import { useToast } from "@chakra-ui/react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"


interface NextAuthRefreshTokenProps {
    children?: any
}

const NextAuthRefreshToken: FC<NextAuthRefreshTokenProps> = (props) => {
    const toast = useToast()
    const {data, status} = useSession()

    useEffect(() => {
        // @ts-ignore
        if (data?.error == "RefreshAccessTokenError") {
            toast({title: "Su sesión a expirado", status: "warning"})
            signOut()
        }
    }, [data])

    return (
        <>
            {props.children}
        </>
    )
}


export default NextAuthRefreshToken
