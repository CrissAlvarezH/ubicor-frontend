import { Box, HStack, Text, Divider, Badge } from "@chakra-ui/react"
import { RoomRetrieve } from "api_clients"
import { FC } from "react"


interface BuildingFloorProps {
    floor: number
    rooms: RoomRetrieve[]
}

const BuildingFloor: FC<BuildingFloorProps> = ({floor, rooms}: BuildingFloorProps) => {
    return (
        <Box rounded="lg" boxShadow="base" borderWidth={1} borderColor="gray.200">
            <Box display="flex" justifyContent="space-between" px={4} py={2}>
                <Text fontWeight="bold" color="gray.800">Piso {floor}</Text>
                <Text fontSize="sm" color="gray.500">{rooms.length} Salones</Text>
            </Box>

            <Divider borderColor="gray.400"/>

            {
                rooms.map(r => (
                    <Box key={r.id}>
                        <Box display="flex" alignItems="center" py={2} px={3}>
                            <Badge variant="solid" colorScheme="teal"
                                px={2} py={.5} rounded="full">
                                {r.code}
                            </Badge>
                            <Text px={3}>{r.name}</Text>
                        </Box>

                        <Box px={3}>
                            <Divider />
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}


export default BuildingFloor
