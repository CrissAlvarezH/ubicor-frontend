import { Box, Button, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Form, Formik } from "formik"
import * as Yup from "yup"
import InputField from "./InputField";
import { OpenAPI, RoomCreate, RoomsService } from "api_clients";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useApiErrorHandler } from "utils/errors";


const CreateRoomFormSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    floor: Yup.number().min(1).max(50),
})

const initialValues = {
    name: "",
    code: "",
    floor: undefined
}

interface CreateRoomFormData {
    name: string
    code: string
    floor?: number
}

interface CreateRoomModalProps {
    onClose: () => void
    isOpen: boolean
    onCreateRoom: () => void
}

const CreateRoomModal: FC<CreateRoomModalProps> = ({onClose, isOpen, onCreateRoom}) => {
    const router = useRouter()
    const toast = useToast()
    const apiErrorHandler = useApiErrorHandler()
    const {data: userData, status: sessionStatus} = useSession()

    useEffect(() => {
        if (!isOpen)
            return

        switch(sessionStatus) {
            case "unauthenticated":
                toast({title: "Debe estar autenticado", status: "error"})
                break
            case "authenticated":
                OpenAPI.TOKEN = userData?.access_token as string
                break
        }
    }, [sessionStatus])

    async function onSubmitRoom(data: CreateRoomFormData) {
        const body: RoomCreate = {
            ...data,
            floor: data?.floor || 1
        }

        try {
            await RoomsService.roomsCreate(
                router.query.university_slug!.toString(),
                Number.parseInt(router.query.building_id!.toString()),
                body
            )
            onClose()
            onCreateRoom()
        } catch (error: any) {
            apiErrorHandler(error)
        }
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} size="xl">
            <ModalOverlay />
            <ModalContent m={2}>
                <ModalHeader>Agregar salón</ModalHeader>
                <ModalBody>
                    <VStack width="100%">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={CreateRoomFormSchema}
                            validateOnBlur={false}
                            onSubmit={onSubmitRoom}
                            >
                            {({isSubmitting, values, errors}) => (
                                <Form>
                                    <InputField 
                                        name="name"
                                        placeholder="Nombre"
                                        label="Nombre"/>

                                    <Box mt={2}>
                                        <InputField 
                                            name="code"
                                            placeholder="Código"
                                            label="Código"/>
                                    </Box>

                                    <Box mt={2}>
                                        <InputField
                                            name="floor"
                                            placeholder="Piso"
                                            label="Piso"/>
                                    </Box>

                                    <Button 
                                        w="100%" my={7} colorScheme="teal"
                                        type="submit" isLoading={isSubmitting}>
                                        Crear salón
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


export default CreateRoomModal