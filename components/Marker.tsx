import { Box, Text, Fade, ScaleFade } from "@chakra-ui/react"
import { BuildingList } from "api_clients"
import { FC } from "react"


interface MarkerProps {
    building: BuildingList,
    onSelected: (b: BuildingList) => void
}


export const BaseMarker: FC<MarkerProps> = ({building, onSelected}: MarkerProps) => {

    return (
        <Box 
            onClick={(e) => {
                e.stopPropagation()
                onSelected(building)
            }}
            rounded="full" position="relative"
            backgroundColor="black"
            p={2} minW={7} textAlign="center" cursor="pointer"
            boxShadow="base">
            <Text
                color="white">
                {building.code}
            </Text>
        </Box>
    )
}


export const SelectedMarker: FC<MarkerProps> = ({building, onSelected}: MarkerProps) => {

    return (
        <ScaleFade initialScale={0.8} in={true}>
            <Box 
                onClick={(e) => {
                    e.stopPropagation()
                    onSelected(building)
                }}
                rounded="full" position="relative"
                backgroundColor="white" zIndex={10}
                p={2} minW={9} textAlign="center" cursor="pointer"
                boxShadow="dark-lg" borderWidth={1} borderColor="gray.500">
                <Text
                    color="black" fontWeight="bold" fontSize="sm">
                    {building.code}
                </Text>
            </Box>
        </ScaleFade>
    )
}