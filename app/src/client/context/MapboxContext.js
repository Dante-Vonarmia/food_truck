import React, { createContext, useContext, useState, useEffect } from 'react';
import config from '@/client/config';

// Set your Mapbox access token
mapboxgl.accessToken = config.mapboxToken;

const MapboxContext = createContext(null);

export const MapboxProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/prakhar/cij2cpsn1004p8ykqqir34jm8',
        center: [-122.44, 37.77],
        zoom: 12
      });

      map.on('load', () => {
        setMap(map);
      });

      // Clean up on unmount
      return () => map.remove();
    };

    if (!map) { // ensure map initializes only once
      initializeMap({ setMap, mapContainer: "map" });
    }
  }, [map]); // dependency array ensures effect runs only once

  return <MapboxContext.Provider value={{ map }}>{children}</MapboxContext.Provider>;
};

export const useMapboxContext = () => useContext(MapboxContext);
