import { Box, Button, HStack, IconButton, Modal, ModalContent, ModalOverlay, StackDivider, Text, useDisclosure, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import InputField from "components/InputField"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"
import { SimpleMap, MapWrapper } from "components/SimpleMap"
import { AddIcon } from "@chakra-ui/icons"



const CreateBuildingPage = () => {
    const router = useRouter()
    const {isOpen: isSetPositionDialogOpen, onToggle: onToggleSetPositionDialog} = useDisclosure()

    
    return (
        <MapWrapper>
            <BackNavBar title={`Crear bloque para ${router.query.university_slug}`}/>    

            <Box display="flex" justifyContent="center">
                <VStack align="stretch" flex={1} maxW="600px" pt={{"base": 5, "md": 10}} px={5}>
                    <Formik
                        initialValues={{name: "", code: "", position: undefined}}
                        onSubmit={(data) => console.log(data)}>
                        {({isSubmitting, values, setFieldValue}) => (
                            <Form>
                                <MapSetPositionDialog 
                                    mapCenter={values.position}
                                    isOpen={isSetPositionDialogOpen} onClose={onToggleSetPositionDialog}
                                    onSetPosition={(position) => setFieldValue("position", position)}/>

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

                                {/* Zones */}
                                <Box mt={3}>
                                    <Text pb={2} fontWeight="semibold">Zona</Text>
                                    <HStack 
                                        divider={<StackDivider/>} spacing={0}
                                        borderWidth={1.5} rounded="md" borderColor="gray.200">
                                        <HStack flex={1}>

                                        </HStack>
                                        <IconButton variant="ghost" aria-label="Agregar zona" icon={<AddIcon />}/>
                                    </HStack>
                                </Box>

                                {/* Location */}
                                <Box borderColor="gray.200" rounded="md" mt={7} borderWidth={1.5}>
                                    <HStack justify="space-between" pl={3}>
                                        <Text fontWeight="semibold">Ubicación</Text>
                                        <Button 
                                            onClick={() => onToggleSetPositionDialog()}
                                            colorScheme="blue" variant="ghost">
                                            { values.position ? "Editar" : "Agregar"}
                                        </Button>
                                    </HStack>
                                        
                                    {
                                        values.position ? (
                                            <Box h={52}>
                                                <SimpleMap 
                                                    center={values.position}
                                                    markers={[values.position]}
                                                    options={{gestureHandling: "none"}}/>
                                            </Box>
                                        ) : (
                                            <Text 
                                                w="100%" textAlign="center" p={10}
                                                color="gray" fontSize="sm">
                                                No establecida
                                            </Text>
                                        )
                                    }
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
            </Box>
        </MapWrapper>
    )
}

interface MapSetPositionDialogProps {
    mapCenter: google.maps.LatLngLiteral | undefined
    isOpen: boolean
    onClose: () => void
    onSetPosition: (position: google.maps.LatLngLiteral | undefined) => void
}

const MapSetPositionDialog: FC<MapSetPositionDialogProps> = ({mapCenter, isOpen, onClose, onSetPosition}: MapSetPositionDialogProps) => {
    const cancelRef = useRef<any>()

    const [map, setMap] = useState<google.maps.Map>()

    const handleOnSetPosition = () => {
        const center = map?.getCenter()
        if (center) {
            const position = {
                lat: center.lat(), lng: center.lng()
            }
            onSetPosition(position)
            onClose()
        }
    }

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
                        <Box 
                            bg="blackAlpha.300"
                            p={2.5} rounded="full" borderWidth={2} borderColor="black" zIndex={10}>
                            <Box p={0.5} bg="black" rounded="full"/>
                        </Box>
                    </Box>
                    <SimpleMap 
                        center={mapCenter}
                        onLoad={(map) => setMap(map)}/>
                </Box>
                <HStack justify="end">
                    <Button colorScheme="gray" variant="ghost" ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" variant="ghost" onClick={handleOnSetPosition}>
                        Guardar
                    </Button>
                </HStack>
            </ModalContent>

        </Modal>
    )
}


export default CreateBuildingPage
