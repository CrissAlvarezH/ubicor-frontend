import Image from "next/image"
import { GoogleMap, LoadScript, InfoWindow, OverlayView, Marker } from '@react-google-maps/api';
import { FC, useEffect, useState } from "react"
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


const BuildingMap: FC<MapProps> = ({center, buildings, buildingFocus}: MapProps) => {
    const router = useRouter()
    const [buildingSelected, setBuildingSelected] = useState<BuildingList|null>(null)

    useEffect(() => {
        if ("b" in router.query && buildingSelected == null) {
            const building = buildings.find(b => b.id.toString() === router.query.b)
            if (building) setBuildingSelected(building)
        }
    }, [router.query])

    useEffect(() => {
        // every time that building selected change this is printed on url
        // to when the page is refreshed it come back to focus the same building
        let path = undefined
        if (buildingSelected)
            path = `/${router.query.university_slug}/map?b=${buildingSelected.id}`
        else
            if (router.query.focus_on === "map") // if the map is showing
                path = `/${router.query.university_slug}/map`
     
        if (path) router.push(path, undefined, {shallow: true})
    }, [buildingSelected])

    return (
        <LoadScript
            googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ""}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                    onClick={() => setBuildingSelected(null)}
                    options={mapOptions}
                    onCenterChanged={() => console.log("building map on center changed", center)}>
                    
                    {
                        buildingSelected  && (
                            <InfoWindow
                                position={buildingSelected.position}
                                onCloseClick={() => setBuildingSelected(null)}>
                                <Link href={`/${router.query.university_slug}/buildings/${buildingSelected.id}`}><a>
                                    <Box 
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

export default BuildingMap
