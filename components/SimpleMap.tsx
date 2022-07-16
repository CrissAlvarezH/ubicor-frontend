import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FC } from "react";


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


interface SimpleMapProps {
    zoom?: number
    markers?: google.maps.LatLngLiteral[]
    center?: google.maps.LatLngLiteral
    options?: google.maps.MapOptions
}

const SimpleMap: FC<SimpleMapProps> = ({
    zoom = 13, markers = [], center = {lat: 8.4116493, lng: -75.5885057},
    options = {}
}) => {
    const mapOptions = {...defaultMapOptions, ...options}

    return (
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={mapOptions}
                zoom={zoom}
                center={center}
                onClick={() => console.log("on map click")}
                onCenterChanged={() => console.log("center", center)}
            >

                {
                    markers.map((m: google.maps.LatLngLiteral, i: number) => (
                        <Marker key={i} position={m}/>
                    ))
                }

            </GoogleMap>
        </LoadScript>
    )
}



export default SimpleMap