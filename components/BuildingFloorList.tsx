import { Box, useDisclosure, useToast } from "@chakra-ui/react"
import { OpenAPI, RoomRetrieve, RoomsService } from "api_clients"
import { useSession } from "next-auth/react"
import Router, { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { Scopes } from "utils/constants"
import { useApiErrorHandler } from "utils/errors"
import BuildingFloor from "./BuildingFloor"
import ConfirmationDialog from "./ConfirmationDialog"


interface BuildingFloorListProps {
    rooms: RoomRetrieve[]
    onRemoveRoom: (room: RoomRetrieve) => void
}

const BuildingFloorList: FC<BuildingFloorListProps> = ({rooms, onRemoveRoom}) => {
    const router = useRouter()
    const toast = useToast()
    const apiErrorHandler = useApiErrorHandler()
    const {
        isOpen: isOpenDeleteRoomConfirmation,
        onToggle: onToggleDeleteRoomConfirmation,
        onClose: onCloseDeleteRoomConfirmation
    } = useDisclosure()
    const [roomToDelete, setRoomToDelete] = useState<RoomRetrieve>()
    const {data: userData, status: sessionStatus} = useSession()
    const [showAdminButtons, setShowAdminButtons] = useState(false)

    useEffect(() => {
        if (sessionStatus == "authenticated") {
            OpenAPI.TOKEN = userData.access_token as string
            if (userData.scopes.includes(Scopes.EDIT_BUILDINGS)) {
                setShowAdminButtons(true)
            }
        }
    }, [sessionStatus])

    async function handleOnDeleteRoom(room: RoomRetrieve) {
        setRoomToDelete(room)
        onToggleDeleteRoomConfirmation()
    }

    async function handleOnConfirmationDeleteRoom() {
        if (!roomToDelete) {
            toast({title: "Debe seleccionar el salón a borrar", status: "error"})
            return 
        }
        try {
            await RoomsService.roomsDelete(
                router.query.university_slug as string,
                roomToDelete.id
            )
            onCloseDeleteRoomConfirmation()
            Router.reload()
        } catch (error: any) {
            apiErrorHandler(error)
        }
    }


    let floors = rooms.map(r => r.floor) // get room floors
    floors = floors.filter((f, i) => floors.indexOf(f) == i) // eliminate duplicates

    // split data in two columns
    const floors_odd = floors.filter(f => f % 2 !== 0)
    const floors_pair = floors.filter(f => f % 2 === 0)

    return (
        <Box>

            <ConfirmationDialog 
                message={`¿Seguro que quiere elimnar el salón "${roomToDelete?.name}"?`}
                confirmationText="Eliminar"
                isOpen={isOpenDeleteRoomConfirmation} onClose={onCloseDeleteRoomConfirmation}
                onYes={handleOnConfirmationDeleteRoom}/>

            <Box display={{"base": "none", "md":"flex"}} p={1}>
                <Box flex={1}>
                    {
                        floors_odd.map(f => (
                            <Box key={f} p={1}>
                                <BuildingFloor
                                    floor={f}
                                    showAdminButtons={showAdminButtons}
                                    onDeleteRoom={handleOnDeleteRoom}
                                    rooms={rooms.filter(r => r.floor == f)}/>
                            </Box>
                        ))
                    }
                </Box>
                <Box flex={1}>
                    {
                        floors_pair.map(f => (
                            <Box key={f} p={1}>
                                <BuildingFloor
                                    floor={f}
                                    showAdminButtons={showAdminButtons}
                                    onDeleteRoom={handleOnDeleteRoom}
                                    rooms={rooms.filter(r => r.floor == f)}/>
                            </Box>
                        ))
                    }
                </Box>
            </Box>

            <Box display={{"base": "static", "md":"none"}} p={1}>
                {
                    floors.map(f => (
                        <Box key={f} p={1}>
                            <BuildingFloor
                                floor={f}
                                showAdminButtons={showAdminButtons}
                                onDeleteRoom={handleOnDeleteRoom}
                                rooms={rooms.filter(r => r.floor == f)}/>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}


export default BuildingFloorList