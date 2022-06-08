import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { ModalOverlay, Modal, ModalContent, ModalBody, Box, VStack, HStack, Input, Text, InputLeftElement, InputGroup, IconButton, Divider, Badge, StackDivider } from "@chakra-ui/react"
import { BuildingList, RoomRetrieve, RoomsService } from "api_clients"
import { FC, useState } from "react"


interface SearchModalProps {
    buildings: BuildingList[]
    onClose: () => void
    isOpen: boolean
}


const BuildingsAndRoomsSearchModal: FC<SearchModalProps> = ({buildings, onClose, isOpen}: SearchModalProps) => {
    const [isLoadingRooms, setIsLoadingRooms] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState<RoomRetrieve[]>([])
    const [filteredBuildings, setFilteredBuildings] = useState<BuildingList[]>([])

    const searchRooms = (search: string) => {
        if (search.length == 0)
            return setFilteredRooms([])

        setIsLoadingRooms(true)

        RoomsService.roomsListStandalone(search)
            .then((rooms: RoomRetrieve[]) => {
                setFilteredRooms(rooms)
                setIsLoadingRooms(false)
            })
            .catch((error: any) => console.error("Search", error))
    }

    const searchBuildings = (search: string) => {
        if (search.length == 0)
            return setFilteredBuildings([])

        const filtered = buildings.filter(
            (b: BuildingList) => (
                b.name.toLowerCase().includes(search.toLowerCase()) ||
                b.code.toLowerCase().includes(search.toLowerCase())
            )
        )

        setFilteredBuildings(filtered)
    }


    const onInputChange = (e: any) => {
        let value = e.target.value

        searchBuildings(value)
        searchRooms(value)
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} size="xl">
            <ModalOverlay />
            <ModalContent m={2}>
                <ModalBody>
                    <VStack>
                        {/* Search */}
                        <HStack width="100%">
                            <InputGroup>
                                <InputLeftElement children={<SearchIcon />}/>
                                <Input 
                                    onChange={onInputChange}
                                    rounded="full" autoFocus variant="filled"/>
                            </InputGroup>

                            <IconButton
                                onClick={onClose}
                                rounded="full" aria-label="Close search" icon={<CloseIcon />} />
                        </HStack>

                        {/* Buildings */}
                        {
                            filteredBuildings.length > 0 && (
                                <VStack align="start" width="100%">
                                    <Divider borderColor="gray.300" />

                                    <Text fontSize="lg" pb={1} fontWeight="bold">Bloques</Text>

                                    <VStack width="100%" px={2} align="start" divider={<StackDivider />}>
                                        {
                                            filteredBuildings.map((b: BuildingList) => (
                                                <HStack>
                                                    <Badge 
                                                        px={2} py={.5} rounded="full"
                                                        bg="teal.400" color="white">
                                                        {b.code}
                                                    </Badge>
                                                    <Text>{b.name}</Text>
                                                </HStack>
                                            ))
                                        }
                                    </VStack>
                                </VStack>
                            )
                        }

                        {/* Rooms */}
                        {
                            filteredRooms.length > 0 && (
                                <VStack align="start" width="100%">
                                    <Divider borderColor="gray.300" />

                                    <Text fontSize="lg" pb={1} fontWeight="bold">Salones</Text>

                                    <VStack width="100%" px={2} align="start" spacing={2.5} divider={<StackDivider />}>
                                        {
                                            filteredRooms.map((r: RoomRetrieve) => (
                                                <HStack>
                                                    <Badge 
                                                        px={2} py={.5} rounded="full"
                                                        bg="blue.400" color="white">{r.code}</Badge>
                                                    <Text>{r.name}</Text>
                                                </HStack>
                                            ))
                                        }
                                    </VStack>
                                </VStack>
                            )
                        }
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


export default BuildingsAndRoomsSearchModal
