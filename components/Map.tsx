import Image from "next/image"
import { GoogleMap, LoadScript, InfoWindow, OverlayView, Marker } from '@react-google-maps/api';
import { FC, useState } from "react"
import { BuildingList } from 'api_clients';
import { getFirstImage } from 'utils/data';
import { Box, Heading } from '@chakra-ui/react';
import { BaseMarker, SelectedMarker } from "./Marker";
import { useRouter } from "next/router";
import Link from "next/link";


const containerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
    gestureHandling: "greedy",
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
    buildingFocus: BuildingList|undefined
}


const Map: FC<MapProps> = ({center, buildings, buildingFocus}: MapProps) => {
    const router = useRouter()
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
                                <Link href={`${router.asPath}/${buildingSelected.id}`}><a>
                                    <Box 
                                        onClick={() => console.log("click to", buildingSelected.name)}
                                        w={56} h={48}
                                        pl={1} pt={1}
                                        display="flex"
                                        flexDir="column">
                                        <Box position="relative" rounded="md" overflow="hidden" flex={1}>
                                            <Image src={getFirstImage(buildingSelected)} layout="fill" objectFit="cover" alt="Building marker"/>
                                        </Box>
                                        <Heading as='h3' size='base' pt={1} color="black">{buildingSelected.name}</Heading>
                                    </Box>
                                </a></Link>
                            </InfoWindow>
                        )
                    }

                    {
                        buildings.map((b: BuildingList) => (
                            <OverlayView 
                                key={b.id} position={b.position}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                getPixelPositionOffset={(oW: number, oH: number) => ({x: 0 - oW/2, y: 0})}>
                                    
                                {
                                    b == buildingSelected || b == buildingFocus ? (
                                        <SelectedMarker building={b} onSelected={setBuildingSelected}/>
                                    ): (
                                        <BaseMarker building={b} onSelected={setBuildingSelected}/>
                                    )
                                }
                            </OverlayView>
                        ))
                    } 

                </GoogleMap>
        </LoadScript>
    )
}

export default Map
