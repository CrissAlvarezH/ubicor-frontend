import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Container, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC } from "react"


interface BackNavBarProps {
    title: string
    to?: string
    actions?: string[]
    onActionClick?: (action: string) => void
}

const BackNavBar: FC<BackNavBarProps> = ({title, to, actions = [], onActionClick}) => {
    const router = useRouter()
    console.log("actions", actions)

    return (
        <Box backgroundColor="teal.500" px={2} py={2} shadow="base">
            <Container maxW="7xl" p={0} display="flex" alignItems="center">
                <HStack justify="space-between" width="full">
                    <HStack>
                        <IconButton
                            onClick={() => to ? router.replace(to) : router.back()}
                            aria-label="Back" colorScheme="teal" icon={<ArrowBackIcon w={6} h={6}/>}/>
                        <Heading px={1} size="md" as="h2" color="white">{title}</Heading>
                    </HStack>
                    {
                        onActionClick && actions.length > 0 && (
                            <Menu>
                                <MenuButton 
                                    as={IconButton}
                                    icon={<HamburgerIcon />}
                                    arial-label="actions"
                                    variant="ghost"
                                    color="white"
                                />
                                <MenuList>
                                    {actions.map(action => (
                                        <MenuItem
                                            key={action}
                                            onClick={() => onActionClick(action)}>
                                            {action}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        )
                    }
                </HStack>
            </Container>

        </Box>
    )
}

export default BackNavBar
