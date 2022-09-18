import { ArrowBackIcon, HamburgerIcon, LockIcon } from "@chakra-ui/icons"
import { Box, Button, Container, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC } from "react"


interface BackNavBarProps {
    title: string
    to?: string
    buttons?: string[]
    onButtonClick?: (button: string) => void
    menuActions?: string[]
    onMenuActionClick?: (action: string) => void
}

const BackNavBar: FC<BackNavBarProps> = (
    {title, to, menuActions = [], onMenuActionClick, buttons = [], onButtonClick}
) => {
    const router = useRouter()
    const a = <LockIcon />
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

                    {/* Buttons */}
                    {
                        onButtonClick && buttons.length > 0 && (
                            <HStack>
                                {buttons.map((a: string) => (
                                    <Button key={a} variant="ghost" color="white"
                                        onClick={() => onButtonClick(a)}>
                                        {a}
                                    </Button>
                                ))}
                            </HStack>
                        )
                    }

                    {/* Menu */}
                    {
                        onMenuActionClick && menuActions.length > 0 && (
                            <Menu>
                                <MenuButton 
                                    as={IconButton}
                                    icon={<HamburgerIcon />}
                                    arial-label="actions"
                                    variant="ghost"
                                    color="white"
                                />
                                <MenuList zIndex={100}>
                                    {menuActions.map(action => (
                                        <MenuItem
                                            key={action}
                                            onClick={() => onMenuActionClick(action)}>
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
