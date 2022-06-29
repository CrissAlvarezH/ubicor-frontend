import { FC } from "react"
import { Badge, Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import { OpenAPI } from "api_clients"
import Image from "next/image"

import { BuildingImageRetrieve, BuildingList } from "api_clients"
import { zoneColorSchemas } from "utils/styles"


export function getImageUrl(buildingImages: BuildingImageRetrieve[], position: number): string {
    let path = "/empty-img.png" // by default each image is empty
    if (buildingImages.length > position)
        if (position === 0)
            path = OpenAPI.BASE + buildingImages[position].image.medium
        else 
            path = OpenAPI.BASE + buildingImages[position].image.small

    return path
}

interface BuildingProps {
    building: BuildingList
}

const Building: FC<BuildingProps> = ({building}: BuildingProps) => {

    return (
        <Box shadow="md" background="white" borderWidth="1px" h="full" rounded="md" cursor="pointer">
            {/* Images */}
            <Grid
                h={44}
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(6, 1fr)'
                gap={.5}
                roundedTop="md"
                overflow="hidden"
                >
                <GridItem rowSpan={2} colSpan={4} bg='tomato' position="relative">
                    <Image src={getImageUrl(building.building_images, 0)} layout="fill" objectFit="cover" alt="Building"/>
                </GridItem>

                <GridItem rowSpan={1} colSpan={2} bg='papayawhip' position="relative">
                    <Image src={getImageUrl(building.building_images, 1)} layout="fill" objectFit="cover" alt="Building"/>
                </GridItem>

                <GridItem rowSpan={1} colSpan={2} bg='tomato' position="relative">
                    <Image src={getImageUrl(building.building_images, 2)} layout="fill" objectFit="cover" alt="Building"/>
                </GridItem>
            </Grid>

            {/* Texts */} 
            <Box display="flex" alignItems="start" px={2} py={2} justifyContent="space-between">
                <Box pr={1}>
                    <Heading as="h3" size="sm" color="black">{building.name}</Heading>
                    <Text color="gray.500" >N° {building.code}</Text>
                </Box>
                <Badge 
                    variant="solid" 
                    colorScheme={zoneColorSchemas[building.zone]}
                    rounded="full"
                    py={.5} px={2}>
                    Zona {building.zone}
                </Badge>
            </Box>
        </Box>
    )
}


interface BuildingImageGridItemProps {
    position: number
    buildingImages: BuildingImageRetrieve[]
}

const BuildingImageGridItem: FC<BuildingImageGridItemProps> = ({buildingImages, position}: BuildingImageGridItemProps) => {
    let path = "/empty-img.png" // by default each image is empty
    if (buildingImages.length >= position)
        if (position === 1)
            path = buildingImages[position].image.medium
        else 
            path = buildingImages[position].image.small

    return (
        <Image src={path} layout="fill" objectFit="cover" alt="Building"/>
    )
}

export default Building