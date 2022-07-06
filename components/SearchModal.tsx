import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { ModalOverlay, Modal, ModalContent, ModalBody, Box, VStack, HStack, Input, Text, InputLeftElement, InputGroup, IconButton, Divider, Badge, StackDivider, Spinner } from "@chakra-ui/react"
import { BuildingList, CancelablePromise, RoomRetrieve, RoomsService } from "api_clients"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"


interface SearchModalProps {
    buildings: BuildingList[]
    onClose: () => void
    isOpen: boolean
}


const BuildingsAndRoomsSearchModal: FC<SearchModalProps> = ({buildings, onClose, isOpen}: SearchModalProps) => {
    const router = useRouter()

    const [search, setSearch] = useState<string>("")
    const [isLoadingRooms, setIsLoadingRooms] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState<RoomRetrieve[]>([])
    const [filteredBuildings, setFilteredBuildings] = useState<BuildingList[]>([])

    useEffect(() => {
        if (search.length == 0) {
            setIsLoadingRooms(false)
            setFilteredRooms([])
            return
        }

        setIsLoadingRooms(true)

        let roomFetchPromise: CancelablePromise<RoomRetrieve[]>|null = null
        const timeoutCall = setTimeout(() => {
            roomFetchPromise = RoomsService.roomsListStandalone(search)
            roomFetchPromise.then((rooms: RoomRetrieve[]) => {
                setFilteredRooms(rooms)
                setIsLoadingRooms(false)
            })
            .catch((e: any) => {
                console.error("Rooms search", e)
                setIsLoadingRooms(false)
            })
        }, 900)

        return () => {
            clearTimeout(timeoutCall)
            if (roomFetchPromise)
                roomFetchPromise.cancel()
        }
    }, [search])

    useEffect(() => {
        if (search.length == 0)
            return setFilteredBuildings([])

        const filtered = buildings.filter(
            (b: BuildingList) => (
                b.name.toLowerCase().includes(search.toLowerCase()) ||
                b.code.toLowerCase().includes(search.toLowerCase())
            )
        )

        setFilteredBuildings(filtered)
    }, [buildings, search])

    const onClickItem = (building_id: number) => {
        router.push(router.asPath + "/" + building_id) 
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
                                <InputLeftElement>
                                    <SearchIcon />
                                </InputLeftElement>
                                <Input 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                                <HStack key={b.id}
                                                    onClick={e => onClickItem(b.id)}>
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
                        {filteredRooms.length == 0 && isLoadingRooms && <Text color="gray" py={5}>Cargando salones...</Text>}
                        {
                            filteredRooms.length > 0 && (
                                <VStack align="start" width="100%">
                                    <Divider borderColor="gray.300" />

                                    <HStack width="100%" justifyContent="space-between">
                                        <Text fontSize="lg" pb={1} fontWeight="bold">Salones</Text>

                                        {isLoadingRooms && <Spinner />}
                                    </HStack>

                                    <VStack width="100%" px={2} align="start" spacing={2.5} divider={<StackDivider />}>
                                        {
                                            filteredRooms.map((r: RoomRetrieve) => (
                                                <HStack key={r.id}
                                                    onClick={e => onClickItem(r.building_id)}>
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
