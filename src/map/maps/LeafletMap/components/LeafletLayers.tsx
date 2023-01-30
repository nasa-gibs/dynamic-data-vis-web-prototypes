import React, { useState, useEffect, useRef, useReducer } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import * as L from "leaflet";
import { useAppSelector, useAppDispatch } from "../../../../redux/store/hooks";

const LeafletLayers = ({
  layerToAdd,
  addLayer,
  lat,
  lon,
  setZoom,
  zoom,
  flyTrigger,
  setFlyTrigger,
  requestLeafletImagery,
}) => {
  // custom react-leaflet hook to access map object
  const map = useMap();

  const leafletZoom = useAppSelector((state) => state.worldview.leafletZoom);

  // adds layer to map
  useEffect(() => {
    if (!layerToAdd || !requestLeafletImagery) return;

    const layer = new L.TileLayer(layerToAdd);

    layer.addTo(map);
    // setting state in parent component
    addLayer("");

    const newLocation = { lat: lat, lng: lon };

    map.flyTo(newLocation, leafletZoom);
  }, [layerToAdd]);

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
    },
  });

  useEffect(() => {
    // if(flyTrigger){
    //   const location = [(testCoords[1] + testCoords[3]) / 2,(testCoords[0] + testCoords[2]) / 2];
    //   const newLocation = {lat: location[0], lng: location[1]}
    //   map.flyTo(newLocation, 6);
    //   setFlyTrigger(false);
    // }
    if (flyTrigger) {
      setFlyTrigger(false);
    }
  }, [flyTrigger]);

  return null;
};

export default LeafletLayers;
