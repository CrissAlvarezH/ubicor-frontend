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
        console.log("data", data)
        if (data?.error == "RefreshAccessTokenError") {
            console.log("token expirado loggear!!")
            toast({title: "Sessión expirada, debes volver a iniciar sesión", status: "warning"})
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
