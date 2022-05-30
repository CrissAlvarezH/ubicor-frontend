import { Box, useMediaQuery } from "@chakra-ui/react"
import { RoomRetrieve } from "api_clients"
import { FC, useEffect } from "react"
import BuildingFloor from "./BuildingFloor"


interface BuildingFloorListProps {
    rooms: RoomRetrieve[]
}

const BuildingFloorList: FC<BuildingFloorListProps> = ({rooms}: BuildingFloorListProps) => {
    let floors = rooms.map(r => r.floor) // get room floors
    floors = floors.filter((f, i) => floors.indexOf(f) == i) // eliminate duplicates

    // split data in two columns
    const floors_odd = floors.filter(f => f % 2 !== 0)
    const floors_pair = floors.filter(f => f % 2 === 0)

    return (
        <Box>
            <Box display={{"base": "none", "md":"flex"}} p={1}>
                <Box flex={1}>
                    {
                        floors_odd.map(f => (
                            <Box key={f} p={1}>
                                <BuildingFloor
                                    floor={f}
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
                                rooms={rooms.filter(r => r.floor == f)}/>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}


export default BuildingFloorList