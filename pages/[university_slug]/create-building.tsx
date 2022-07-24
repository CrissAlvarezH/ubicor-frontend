import { Box, Button, Divider, HStack, IconButton, Modal, ModalContent, ModalOverlay, StackDivider, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import InputField from "components/InputField"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"
import { SimpleMap, MapWrapper } from "components/SimpleMap"
import BuildingZoneSelector from "components/BuildingZoneSelector"
import * as Yup from "yup"
import { BuildingsService, OpenAPI } from "api_clients"
import { useSession } from "next-auth/react"


const CreateBuildingFormSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    position: Yup.object().required(),
    zone: Yup.object().required()
})


const CreateBuildingPage = () => {
    const toast = useToast()
    const {data: userData, status: sessionStatus} = useSession()
    const router = useRouter()
    const {isOpen: isSetPositionDialogOpen, onToggle: onToggleSetPositionDialog} = useDisclosure()

    useEffect(() => {
        if (sessionStatus === "unauthenticated")
            toast({title: "Debe estar autenticado", status: "error"})
    }, [sessionStatus])

    const handleCreateBuilding = async (data: any) => {
        if (sessionStatus === "unauthenticated")
            return toast({title: "Debe estar autenticado", status: "error"})

        console.log("user data", userData)

        const body = {...data, zone: data.zone.name}
        try {
            OpenAPI.TOKEN = userData?.access_token as string
            const resp = await BuildingsService.buildingsCreate(router.query.university_slug!!.toString(), body)
            console.log(resp)
        } catch (error) {
            console.log("ERROR", error)
        }
    }
    
    return (
        <MapWrapper>
            <BackNavBar title={`Crear bloque para ${router.query.university_slug}`}/>    

            <Box display="flex" justifyContent="center">
                <VStack align="stretch" flex={1} maxW="600px" pt={{"base": 5, "md": 10}} px={5}>
                    <Formik
                        initialValues={{name: "", code: "", position: undefined, zone: undefined}}
                        validationSchema={CreateBuildingFormSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(data) => handleCreateBuilding(data)}
                        >
                        {({isSubmitting, values, setFieldValue, errors}) => (
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
                                    <Text fontWeight="semibold" pb={2}>Zona</Text>
                                    <BuildingZoneSelector 
                                        university_slug={router.query.university_slug?.toString()}
                                        zoneSelected={values.zone}
                                        onZoneSelected={(z) => setFieldValue("zone", z)}/>
                                </Box>
                                {errors.zone && <Text color="red.500" fontSize="sm" mt={1}>Debe seleccionar una zona</Text>}

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
                                        
                                    <Divider />
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
                                {errors.position && <Text color="red.500" fontSize="sm" mt={1}>Agregue la posición</Text>}

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
