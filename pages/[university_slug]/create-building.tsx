import { Box, Button, HStack, Modal, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import InputField from "components/InputField"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC, useRef, useState } from "react"
import BuildingMap from "components/BuildingMap"
import SimpleMap from "components/SimpleMap"



const CreateBuildingPage = () => {
    const router = useRouter()
    const {isOpen: isSetPositionDialogOpen, onToggle: onToggleSetPositionDialog} = useDisclosure()
    
    return (
        <>
            <BackNavBar title={`Crear bloque para ${router.query.university_slug}`}/>    

            <MapSetPositionDialog isOpen={isSetPositionDialogOpen} onClose={onToggleSetPositionDialog}
                onSetPosition={(position) => console.log(position)}/>

            <VStack align="stretch" pt={{"base": 5, "md": 10}} px={5}>
                <Formik
                    initialValues={{name: "", code: "", position: undefined}}
                    onSubmit={(data) => console.log(data)}>
                    {({isSubmitting, values, handleChange}) => (
                        <Form>
                            <InputField
                                name="name"
                                placeholder="nombre"
                                label="Nombre"/>

                            <Box pt={3}>
                                <InputField
                                    name="code"
                                    placeholder="codigo"
                                    label="Codigo"/>
                            </Box>

                            <Box borderColor="gray.200" rounded="md" mt={7} borderWidth={1.5}>
                                <HStack justify="space-between" pl={3}>
                                    <Text fontWeight="semibold">Ubicación</Text>
                                    <Button 
                                        onClick={() => onToggleSetPositionDialog()}
                                        colorScheme="blue" variant="ghost">Editar</Button>
                                </HStack>
                                <Box h={52}>
                                    <SimpleMap />

                                    {/* <SimpleMap 
                                        center={{lat: 8.4116493, lng: -75.5885057}}
                                        markers={[{lat: 8.4116493, lng: -75.5885057}]}/> */}
                                </Box>
                            </Box>

                            <Button 
                                w="100%" mt={10} type="submit"
                                isLoading={isSubmitting} colorScheme="teal">
                                Crear bloque
                            </Button>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </>
    )
}

interface MapSetPositionDialogProps {
    isOpen: boolean
    onClose: () => void
    onSetPosition: (position: google.maps.LatLng | undefined) => void
}

const MapSetPositionDialog: FC<MapSetPositionDialogProps> = ({isOpen, onClose, onSetPosition}: MapSetPositionDialogProps) => {
    const cancelRef = useRef<any>()

    const [position, setPosition] = useState<google.maps.LatLng>()

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="6xl"
        >
            <ModalOverlay />
            <ModalContent h="90%" overflow="hidden">
                <Box h="100%" position="relative">
                    <Box display="flex" justifyContent="center" alignItems="center"
                        position="absolute" top={0} bottom={0} left={0} right={0}>
                        <Box zIndex={10} p={2} bg="black"></Box>
                    </Box>
                    <SimpleMap />
                </Box>
                <HStack justify="end">
                    <Button colorScheme="gray" variant="ghost" ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" variant="ghost" onClick={() => onSetPosition(position)} ml={3}>
                        Guardar
                    </Button>
                </HStack>
            </ModalContent>

        </Modal>
    )
}


export default CreateBuildingPage
