import { AddIcon, SearchIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, IconButton, Spinner, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { Scopes } from "utils/constants"
import { ProfileIcon } from "./Icons"


interface NavBarProps {
    title: string
    onSearchClick: () => void
    onAddClick?: () => void
}


const NavBar: FC<NavBarProps> = ({title, onSearchClick, onAddClick}) => {
    const router = useRouter()

    const {data, status} = useSession()

    const [profileImage, setProfileImage] = useState<string|undefined>()

    useEffect(() => {
        if (status == "authenticated" && data.user?.image)
            setProfileImage(data.user?.image)
    }, [data, status])

    return (
        <Box position="fixed" top={0} w="100%" zIndex={100} shadow="md" bg="white" h={12} flexShrink={0}>
            <HStack px={3} py={1} justifyContent="space-between">
                <Box>
                    <Text fontWeight="bold">{title}</Text>
                </Box>

                <HStack>
                    <IconButton
                        onClick={() => onSearchClick()}
                        variant="ghost" aria-label="Search" icon={<SearchIcon />}/>
                    
                    {
                        // @ts-ignore
                        data?.scopes.includes(Scopes.CREATE_BUILDINGS) && (
                            <IconButton
                                onClick={() => onAddClick && onAddClick()}
                                variant="ghost" aria-label="Create building" icon={<AddIcon />}/>
                        )
                    }

                    {
                        status === "loading" ? <Box px={2}><Spinner /></Box> : (
                            profileImage ? (
                                <Button
                                    onClick={() => router.push(`/profile?p=${router.asPath}`)}
                                    rounded="full" colorScheme="blackAlpha" overflow="hidden">
                                    <Image layout="fill" objectFit="cover" src={profileImage}/>
                                </Button>
                            ) : (
                                <IconButton
                                    onClick={() => router.push(`/profile?p=${router.asPath}`)}
                                    variant="ghost" aria-label="Profile" icon={<ProfileIcon />}/>
                            )
                        )
                    }
                </HStack>
            </HStack>

            <Box p="1px" bg="gray.200" />
        </Box>
    )
}


export default NavBar
