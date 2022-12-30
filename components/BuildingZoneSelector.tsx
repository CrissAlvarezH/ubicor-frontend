import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, StackDivider, Tag, TagCloseButton, TagLabel, Text, toast, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { OpenAPI } from "api_clients"
import { BuildingZoneRetrieve } from "api_clients/models/BuildingZoneRetrieve"
import { BuildingZonesService } from "api_clients/services/BuildingZonesService"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { useApiErrorHandler } from "utils/errors"


interface BuildingZoneSelectorProps {
    university_slug: string
    zoneSelected?: string
    onZoneSelected: (zone?: string) => void
}

const BuildingZoneSelector: FC<BuildingZoneSelectorProps> = ({university_slug, zoneSelected, onZoneSelected}) => {
    const {data: userData, status: sessionStatus} = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [zones, setZones] = useState<BuildingZoneRetrieve[]>([])
    
    const {isOpen: isCreateZoneModalOpen, onToggle: onToggleCreateZoneModal} = useDisclosure()

    const apiErrorHandler = useApiErrorHandler()

    const toast = useToast()


    useEffect(() => {
        setIsLoading(true)

        if (sessionStatus == "authenticated") {
            // @ts-ignore
            OpenAPI.TOKEN = userData?.access_token as string
            BuildingZonesService.buildingZonesList(university_slug)
                .then(resp => {
                    setZones(resp)
                    setIsLoading(false)
                })
                .catch(error => {
                    setIsLoading(false)
                    apiErrorHandler(error, "Error al cargar las zonas")
                })
        }
    }, [sessionStatus])

    const handleOnDeleteZone = (zone: BuildingZoneRetrieve) => {
        BuildingZonesService.buildingZonesDelete(zone.id, university_slug)
            .then(resp => {
                setZones(zones.filter(z => z.id != zone.id))
            })
            .catch(error => {
                apiErrorHandler(error)
            })
    }

    return (
        <>
            <CreateZoneDialog isOpen={isCreateZoneModalOpen} onClose={onToggleCreateZoneModal}
                onCreateZone={(newZone) => setZones([...zones, newZone])}/>

            <VStack 
                divider={<StackDivider />}
                borderWidth={1.5} spacing={0} rounded="md" borderColor="gray.200">
                <HStack pl={3} w="100%" justify="space-between">
                    <Text fontSize="sm" color="gray">Seleccione una</Text>
                    <Button variant="ghost" size="sm" colorScheme="blue"
                        onClick={() => onToggleCreateZoneModal()}>Crear zona</Button>
                </HStack>
                <HStack 
                    divider={<StackDivider/>} spacing={0}
                    >
                    {isLoading && (
                        <Box py={4}><Spinner /></Box>
                    )}

                    {!isLoading && zones.length == 0 && (
                        <Text py={5}>No hay zonas</Text>
                    )}

                    {zones.length > 0 && (
                        <HStack flex={1} p={1} spacing={0} flexWrap="wrap">
                            {zones.map(zone => (
                                <Box key={zone.id} p={1} onClick={() => onZoneSelected(zone.name)}>
                                    <Tag size="lg" borderRadius="full" variant="solid" 
                                        colorScheme={zone.name == zoneSelected ? "green" : "gray"}>
                                        <TagLabel>Zona {zone.name}</TagLabel>
                                        <TagCloseButton onClick={() => handleOnDeleteZone(zone)}/>
                                    </Tag>
                                </Box>
                            ))}
                        </HStack>
                    )}
                </HStack>
            </VStack>
        </>
    )
}


interface CreateZoneDialogProps {
    isOpen: boolean 
    onClose: () => void
    onCreateZone: (zone: BuildingZoneRetrieve) => void
}

const CreateZoneDialog: FC<CreateZoneDialogProps> = ({isOpen, onClose, onCreateZone}) => {
    const [name, setName] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const apiErrorHandler = useApiErrorHandler()
    const router = useRouter()
    const toast = useToast()

    const handleOnClickCreate = () => {
        if (!name) {
            toast({title: "Debe digitar el nombre", status: "error"})
            return 
        }

        if (!router.query.university_slug) {
            toast({title: "La universidad no esta seleccionada", status: "error"})
            return 
        }

        setIsLoading(true)
        const uni_slug = router.query.university_slug?.toString() 
        BuildingZonesService.buildingZonesCreate(
            uni_slug, {university_slug: uni_slug, name: name}
        ).then(resp => {
            onCreateZone(resp)
            setIsLoading(false)
            onClose()
            setName("")
        })
        .catch(error => {
            apiErrorHandler(error)
            setIsLoading(false)
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent mx={3}>
                <ModalHeader>Crear zona</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input 
                            onChange={e => setName(e.target.value.toString())} 
                            value={name}
                            placeholder='nombre de la zona' />
                    </FormControl>
                </ModalBody>
                
                <ModalFooter>
                    <Button 
                        onClick={() => handleOnClickCreate()}
                        colorScheme="teal" isLoading={isLoading} mr={3}>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


export default BuildingZoneSelector
