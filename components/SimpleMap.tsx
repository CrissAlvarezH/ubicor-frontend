import { GoogleMap, LoadScript, Marker, GoogleMapProps } from "@react-google-maps/api";
import { FC, useState } from "react";


const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultMapOptions: google.maps.MapOptions = {
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


type SimpleMapProps = GoogleMapProps & {
    zoom?: number
    markers?: google.maps.LatLngLiteral[]
    center?: google.maps.LatLngLiteral
    options?: google.maps.MapOptions
}

export const SimpleMap: FC<SimpleMapProps> = ({
    zoom = 16, markers = [], center = {lat: 8.4116493, lng: -75.5885057},
    options = {}, ...props
}) => {
    const mapOptions = {...defaultMapOptions, ...options}

    return (
        <GoogleMap
            {...props}
            mapContainerStyle={containerStyle}
            options={mapOptions}
            zoom={zoom}
            center={center}
            onClick={() => console.log("map click")}
        >

            {
                markers.map((m: google.maps.LatLngLiteral, i: number) => (
                    <Marker key={i} position={m}/>
                ))
            }

        </GoogleMap>
    )
}


interface MapWrapperProp {
    children?: any
}

export const MapWrapper: FC<MapWrapperProp> = ({children}: MapWrapperProp) => {
    return (
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ""}>
            {children}
        </LoadScript>
    )
}
