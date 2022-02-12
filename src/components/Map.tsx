import React from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface MapProps {
  geolocation: {
    lat: number;
    lng: number;
  };
  location: string;
}

export default function Map({ geolocation, location }: MapProps) {
  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      center={[geolocation.lat, geolocation.lng]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
      />
      <Marker position={[geolocation.lat, geolocation.lng]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}
