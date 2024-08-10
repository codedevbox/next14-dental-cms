"use client"

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MarkerIcon from "/public/images/theme/light/marker2.png";

const DynamicMap = () => (
    <MapContainer className="myMap" style={{ height: "100%" }} center={[49.2684, -123.1497]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
            attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
            icon={
                new L.Icon({
                    iconUrl: MarkerIcon.src,
                    iconRetinaUrl: MarkerIcon.src,
                    iconSize: [36, 49],
                })
            } 
            position={[49.2637, -123.1548]}
        />
    </MapContainer>
);

export default DynamicMap;
