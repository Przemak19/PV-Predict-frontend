import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface LocationMapProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialPosition: [number, number];
}

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect, initialPosition }) => {
    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    return (
        <MapContainer 
            center={initialPosition} 
            zoom={5} 
            style={{ height: '400px', width: '100%', borderRadius: '0.25rem' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={initialPosition} icon={defaultIcon}>
                <Popup>Your current location</Popup>
            </Marker>
            <MapClickHandler />
        </MapContainer>
    );
};

export default LocationMap;