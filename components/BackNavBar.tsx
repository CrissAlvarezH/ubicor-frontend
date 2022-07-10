import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Container, Heading, IconButton } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC } from "react"


interface BackNavBarProps {
    title: string
    to?: string
}

const BackNavBar: FC<BackNavBarProps> = ({title, to}) => {
    const router = useRouter()

    return (
        <Box backgroundColor="teal.500" px={2} py={2} shadow="base">
            <Container maxW="7xl" p={0} display="flex" alignItems="center">
                <IconButton
                    onClick={() => to ? router.replace(to) : router.back()}
                    aria-label="Back" colorScheme="teal" icon={<ArrowBackIcon w={6} h={6}/>}/>
                <Heading px={1} size="md" as="h2" color="white">{title}</Heading>
            </Container>
        </Box>
    )
}

export default BackNavBar
