import { Box, Grid, GridItem } from "@chakra-ui/react"
import { BuildingList } from "api_clients"
import { FC } from "react"

import Building from "./Building"


interface BuildingListProps {
    buildings: BuildingList[]
    onBuildingHover: (b: BuildingList|null) => void
}

const BuildingGrid: FC<BuildingListProps> = ({buildings, onBuildingHover}) => {
    return (
        <Box display="flex" justifyContent="center">
            <Grid
                w="100%"
                maxW="1094px"
                p={2}
                gap={2}
                templateColumns="repeat(auto-fill, minmax(297px, 1fr))">
                {
                    buildings.map((b: BuildingList) => (
                        <GridItem key={b.id}
                            onMouseEnter={() => onBuildingHover(b)}
                            onMouseLeave={() => onBuildingHover(null)}>
                            <Building building={b} />
                        </GridItem>
                    ))
                }
            </Grid> 
        </Box>
    )
}

export default BuildingGrid