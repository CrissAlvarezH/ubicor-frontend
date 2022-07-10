import { Box, Button, Divider, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"


const ProfilePage = () => {
    const {data, status} = useSession()

    return (
        <>
            <BackNavBar title="Perfil"/>

            <VStack display="flex" justifyContent="center">
                {
                    status === "loading" ? (
                        <Box>
                            <Spinner />
                        </Box>
                    ) : (
                        <VStack pt={8} pb={5}>
                            <Box rounded="full" overflow="hidden" w={44} h={44} position="relative">
                                <Image layout="fill" objectFit="cover" src={data?.user?.image || "/empty-img.png"}/>
                            </Box>

                            {
                                status === "unauthenticated" ? (
                                    <Text py={5}>No has ingresado</Text>
                                ) : (
                                    <VStack py={3} spacing={1}>
                                        <Text fontWeight="semibold">{data?.user?.name}</Text>
                                        <Text color="gray.500" fontSize={14}>{data?.user?.email}</Text>
                                    </VStack>
                                )
                            }

                            <Button variant="outline" onClick={() => status === "authenticated" ? signOut() : signIn()}>
                                {status === "authenticated" ? "Cerrar sesión" : "Iniciar sesión"}
                            </Button>
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
                        <Text pt={2}>Contactanos al <Text fontWeight="bold">ubicor.contacto@gmail.com</Text></Text>
                    </VStack>
                </Box>
            </VStack>
        </>
    )
}


export default ProfilePage
