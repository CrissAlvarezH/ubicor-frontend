import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, Tag, TagCloseButton, TagLabel, Text, toast, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { BuildingZoneRetrieve } from "api_clients/models/BuildingZoneRetrieve"
import { BuildingZonesService } from "api_clients/services/BuildingZonesService"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"


interface BuildingZoneSelectorProps {
    university_slug?: string
    zoneSelected?: BuildingZoneRetrieve
    onZoneSelected: (zone?: BuildingZoneRetrieve) => void
}

const BuildingZoneSelector: FC<BuildingZoneSelectorProps> = ({university_slug, zoneSelected, onZoneSelected}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [zones, setZones] = useState<BuildingZoneRetrieve[]>([])
    
    const {isOpen: isCreateZoneModalOpen, onToggle: onToggleCreateZoneModal} = useDisclosure()

    const toast = useToast()


    useEffect(() => {
        setIsLoading(true)

        BuildingZonesService.buildingZonesList(university_slug)
            .then(resp => {
                setZones(resp)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                toast({title: "Error al cargar la zonas, recargue la pagina", status: "error"})
            })
    }, [])

    const handleOnDeleteZone = (zone: BuildingZoneRetrieve) => {
        BuildingZonesService.buildingZonesDelete(zone.id)
            .then(resp => {
                setZones(zones.filter(z => z.id != zone.id))
            })
            .catch(error => {
                let msg = error.body.detail
                if (error.body.detail === "this zone is been used")
                    msg = "Esta zona esta siendo usada por otro bloque" 

                toast({
                    title: `Error al eliminar zona '${zone.name}'. ${msg}`,
                    status: "error",
                    isClosable: true,
                    position: "top-right"
                })
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
                        <Text>Cargando...</Text>
                    )}

                    {!isLoading && zones.length == 0 && (
                        <Text>No hay zonas</Text>
                    )}

                    <HStack flex={1} p={1} spacing={0} flexWrap="wrap">
                        {zones.map(zone => (
                            <Box key={zone.id} p={1} onClick={() => onZoneSelected(zone)}>
                                <Tag size="lg" borderRadius="full" variant="solid" 
                                    colorScheme={zone == zoneSelected ? "green" : "gray"}>
                                    <TagLabel>Zona {zone.name}</TagLabel>
                                    <TagCloseButton onClick={() => handleOnDeleteZone(zone)}/>
                                </Tag>
                            </Box>
                        ))}
                    </HStack>
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

        BuildingZonesService.buildingZonesCreate({
            university_slug: router.query.university_slug?.toString(),
            name: name
        }).then(resp => {
            onCreateZone(resp)
            setIsLoading(false)
            onClose()
            setName("")
        })
        .catch(error => {
            toast({title: "Error al crear la zona"})
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
