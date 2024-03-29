import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import { GitHubIcon, GoogleIcon } from "components/Icons"
import InputField from "components/InputField"
import { Form, Formik } from "formik"
import { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
import { signIn, SignInOptions } from "next-auth/react"
import { authOptions } from "pages/api/auth/[...nextauth]"
import * as Yup from "yup"


const LoginFormSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required()
})


interface LoginPageProps {
    error?: string
}

const LoginPage: NextPage<LoginPageProps> = ({error}) => {
    const handleOnLogin = async (provider: string, data?: SignInOptions) => {
        await signIn(provider, data)
    }

    return (
        <>
            <BackNavBar title="Login"/>
            <Box display="flex" justifyContent="center">
                <VStack align="stretch" flex={1} maxW="600px" pt={{"base": 5, "md": 10}} pb={10} px={5}>
                    {
                        error && <Box py={2} px={2} mb={3} bg="orange.100" rounded="lg" color="orange.600">
                            <Text fontSize="sm">Credenciales o contraseña incorrectas</Text>
                        </Box>
                    }

                    <Formik
                        initialValues={{email: "", password: ""}}
                        validationSchema={LoginFormSchema}
                        onSubmit={(data) => handleOnLogin("credentials", data)}>
                        {({isSubmitting}) => (
                            <Form>
                                <InputField 
                                    name="email"
                                    placeholder="correo electronico"
                                    label="Correo electrónico"/>

                                <Box pt={2}>
                                    <InputField
                                        name="password"
                                        placeholder="contraseña"
                                        label="Contraseña"
                                        type="password" />
                                </Box>
                                
                                <Button 
                                    w="100%" mt={10} type="submit" isLoading={isSubmitting} colorScheme="teal">
                                    Entrar
                                </Button>

                                <HStack justifyContent="center" py={3}>
                                    <Text color="gray.600">Si no tienes cuenta, puedes</Text>
                                    <Text color="blue" py={2}>registrate</Text>
                                </HStack>
                            </Form>
                        )}
                    </Formik>

                    {/* <HStack pb={6}>
                        <Divider/>
                        <Text flexShrink={0} color="gray.600">o si lo prefires, puedes</Text>
                        <Divider />
                    </HStack>

                    <VStack spacing={4} align="stretch" pb={10}>
                        <Button onClick={() => handleOnLogin("google")}
                            borderColor="gray.300" borderWidth={2}
                            iconSpacing={3} leftIcon={<GoogleIcon />}>
                            Ingresar con Google
                        </Button>
                    </VStack> */}
                </VStack>
            </Box>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    const {p = '/', error} = ctx.query;
    console.log({error})

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
            error: error || null
        }
    }
}


export default LoginPage
