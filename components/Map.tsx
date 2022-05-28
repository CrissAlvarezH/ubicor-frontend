import { BuildingList } from 'api_clients';
import { FC, useState } from "react"
import Image from "next/image"
import { getFirstImage } from 'utils/data';
import { Box, Text, Heading } from '@chakra-ui/react';
import { GoogleMap, LoadScript, InfoWindow, OverlayView, Marker } from '@react-google-maps/api';


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
                        buildings.map(b => (
                            <Marker 
                                onClick={() => setBuildingSelected(b)}
                                key={b.id} position={b.position}>

                                {
                                    buildingSelected == b && (
                                        <InfoWindow
                                            key={b.id}
                                            onCloseClick={() => setBuildingSelected(null)}>
                                            <Box 
                                                onClick={() => console.log("click to", buildingSelected.name)}
                                                w={56} h={48}
                                                pl={1} pt={1}
                                                display="flex"
                                                flexDir="column">
                                                <Box position="relative" rounded="md" overflow="hidden" flex={1}>
                                                    <Image src={getFirstImage(buildingSelected)} layout="fill" objectFit="cover" />
                                                </Box>
                                                <Heading as='h3' size='base' pt={1} color="black">{buildingSelected.name}</Heading>
                                            </Box>
                                        </InfoWindow>
                                    )
                                }
                            </Marker>
                        ))
                    } 
                </GoogleMap>
        </LoadScript>
    )
}

export default Map
