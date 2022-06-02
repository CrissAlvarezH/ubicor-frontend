import Image from "next/image"
import { GoogleMap, LoadScript, InfoWindow, OverlayView, Marker } from '@react-google-maps/api';
import { FC, useState } from "react"
import { BuildingList } from 'api_clients';
import { getFirstImage } from 'utils/data';
import { Box, Text, Heading } from '@chakra-ui/react';


const containerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ]
}


interface MapProps {
    center: {
        lat: number;
        lng: number;
    },
    buildings: BuildingList[]
}


const Map: FC<MapProps> = ({center, buildings}: MapProps) => {
    const [buildingSelected, setBuildingSelected] = useState<BuildingList|null>(null)

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDwEz0p4iWO4txzwR6rsCpYbEU5kVt0oD4">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                    onClick={() => setBuildingSelected(null)}
                    options={mapOptions}>
                    
                    {
                        buildingSelected  && (
                            <InfoWindow
                                position={buildingSelected.position}
                                onCloseClick={() => setBuildingSelected(null)}>
                                <Box 
                                    onClick={() => console.log("click to", buildingSelected.name)}
                                    w={56} h={48}
                                    pl={1} pt={1}
                                    display="flex" cursor="pointer"
                                    flexDir="column">
                                    <Box position="relative" rounded="md" overflow="hidden" flex={1}>
                                        <Image src={getFirstImage(buildingSelected)} layout="fill" objectFit="cover" />
                                    </Box>
                                    <Heading as='h3' size='base' pt={1} color="black">{buildingSelected.name}</Heading>
                                </Box>
                            </InfoWindow>
                        )
                    }

                    {
                        buildings.map((b: BuildingList) => (
                            <OverlayView 
                                key={b.id} position={b.position}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                getPixelPositionOffset={(oW: number, oH: number) => ({x: 0 - oW/2, y: 0})}>
                                <Box 
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setBuildingSelected(b)
                                    }}
                                    rounded="full" position="relative"
                                    backgroundColor={buildingSelected == b ? "white" : "black"}
                                    p={2} minW={7} textAlign="center" cursor="pointer"
                                    zIndex={buildingSelected == b ? 10 : 1}
                                    boxShadow={buildingSelected == b ? "dark-lg" : "base"}>
                                    <Text
                                        color={buildingSelected == b ? "black" : "white"}>
                                        {b.code}
                                    </Text>
                                </Box>
                            </OverlayView>
                        ))
                    } 

                </GoogleMap>
        </LoadScript>
    )
}

export default Map
