import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
        AlertDialogOverlay, Box, Button, Divider, Heading, Spinner, Text, useDisclosure, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC, useRef } from "react"


const ProfilePage = () => {
    const router = useRouter()
    const {data, status} = useSession()
    const {isOpen: isLogoutAlarmOpen, onToggle: onToggleLogoutAlarm} = useDisclosure()

    return (
        <>
            <BackNavBar title="Perfil"/>

            <OnLogoutAlarmDialog
                isOpen={isLogoutAlarmOpen} onClose={onToggleLogoutAlarm}
                onYes={signOut}/>

            <VStack display="flex" justifyContent="center">
                {
                    status === "loading" ? (
                        <Box>
                            <Spinner />
                        </Box>
                    ) : (
                        <VStack pt={8} pb={5}>
                            {
                                status === "unauthenticated" ? (
                                    <Text py={5}>No has ingresado</Text>
                                ) : (
                                    <VStack py={3} spacing={1}>
                                        <Box rounded="full" overflow="hidden" w={44} h={44} position="relative">
                                            <Image layout="fill" objectFit="cover" src={data?.user?.image || "/empty-img.png"}/>
                                        </Box>
                                        <Text pt={2} fontWeight="semibold">{data?.user?.name}</Text>
                                        <Text color="gray.500" fontSize={14}>{data?.user?.email}</Text>
                                    </VStack>
                                )
                            }

                            {
                                status === "authenticated" && (
                                    <Button variant="outline" onClick={() => onToggleLogoutAlarm()}>
                                        Cerrar sesión
                                    </Button>
                                ) 
                            }

                            {
                                status === "unauthenticated" && (
                                    <Button variant="outline" onClick={() => router.push(`/profile/login?p=${router.asPath}`)}>
                                        Iniciar sesión
                                    </Button>
                                ) 
                            }

                       </VStack>
                    )
                }

                <Divider/>

                <Box py={5} px={9} maxW="800px">
                    <Heading>¿Quieres llevar ubicor a tu universidad?</Heading>
                    <VStack py={5} align="start">
                        <Text>Contactanos para habilitarte la posibilidad de agregar los bloques y salones de tu universidad</Text>
                        <Text pt={2}>
                            Envianos un correo con el nombre de tu universidad y donde se encuentra ubicada, asegurate de estar
                            registrado y podrás agregar tu universidad a Ubicor
                        </Text>
                        <Text pt={2}>Contactanos al </Text>
                        <Text fontWeight="bold">ubicor.contacto@gmail.com</Text>
                    </VStack>
                </Box>
            </VStack>
        </>
    )
}


interface OnLogoutAlarmDialogProps {
    isOpen: boolean
    onClose: () => void
    onYes: () => void
}

const OnLogoutAlarmDialog: FC<OnLogoutAlarmDialogProps> = ({isOpen, onClose, onYes}) => {
    const cancelRef = useRef<any>()

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent mx={5}>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            ¿Seguro que quieres cerrar sesión?
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={() => onYes()} ml={3}>
                                Cerrar sesión
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default ProfilePage
