import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from '../../utils/mapConfig';

const containerStyle = {
  width: '1285px', // Align width to full page screen
  height: '591px', // Align height to full page screen
};

const center = {
  lat: 42.639113,
  lng: 23.373163,
}; // Center the map to point to Mladost 4

const offices = [
    {
        name: "Main office",
        location: {
            lat: 42.638383,
            lng: 23.379608,
        },
    },
    {
        name: "Second office",
        location: {
            lat: 42.673831,
            lng: 23.319,
        },
    },
    {
        name: "Third office",
        location: {
            lat: 42.726164,
            lng: 23.2925,
        },
    },
    {
        name: "Fourth office",
        location: {
            lat: 42.15,
            lng: 24.749997,
        },
    },
]; // Create dummy office locations 

function Offices() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {offices.map(office => {
            return (
                <div key={office.location} >
                    <Marker position={office.location} />
                </div>
            );
        })}
      </GoogleMap>
  ) : <></>
}

export default React.memo(Offices);