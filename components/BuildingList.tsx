import { Box, Grid, GridItem } from "@chakra-ui/react"
import { BuildingList } from "api_clients"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"

import Building from "./Building"


interface BuildingListProps {
    buildings: BuildingList[]
    onBuildingHover: (b: BuildingList|undefined) => void
}

const BuildingGrid: FC<BuildingListProps> = ({buildings, onBuildingHover}) => {
    const router = useRouter()

    return (
        <Box display="flex" justifyContent="center">
            <Grid
                w="100%"
                p={2}
                gap={2}
                templateColumns="repeat(auto-fill, minmax(297px, 1fr))">
                {
                    buildings.map((b: BuildingList) => (
                        <GridItem key={b.id}
                            onMouseEnter={() => onBuildingHover(b)}
                            onMouseLeave={() => onBuildingHover(undefined)}>
                            <Link href={`/${router.query.university_slug}/buildings/${b.id}`}><a>
                                <Building building={b} />
                            </a></Link>
                        </GridItem>
                    ))
                }
            </Grid> 
        </Box>
    )
}

export default BuildingGrid