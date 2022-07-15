import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import { GitHubIcon, GoogleIcon } from "components/Icons"
import InputField from "components/InputField"
import { Form, Formik } from "formik"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { signIn, SignInOptions } from "next-auth/react"
import { authOptions } from "pages/api/auth/[...nextauth]"
import * as Yup from "yup"


const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required().email(),
    password: Yup.string().required()
})


const LoginPage = () => {
    const handleOnLogin = async (provider: string, data?: SignInOptions) => {
        await signIn(provider, data)
    }

    return (
        <>
            <BackNavBar title="Login"/>
            <VStack align="stretch" pt={5} pb={10} px={5}>
                <Formik
                    initialValues={{username: "", password: ""}}
                    validationSchema={LoginFormSchema}
                    onSubmit={(data) => handleOnLogin("credentials", data)}>
                    {({isSubmitting}) => (
                        <Form>
                            <InputField 
                                name="username"
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

                <HStack pb={6}>
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
                    <Button onClick={() => handleOnLogin("github")}
                        bg="black" color="white" iconSpacing={3} leftIcon={<GitHubIcon />}>
                        Ingresar con GitHub
                    </Button>
                </VStack>
            </VStack>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    const {p = '/', error} = ctx.query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}


export default LoginPage
