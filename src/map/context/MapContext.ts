import React, { createContext } from "react";

type ViewProperties = {
  centerCoords: Array<number>;
  latlonCoords: string;
  resolution: number;
  rotation: number;
  zoom: number;
};

interface MapContextType {
  map: any;
  setMap: any;
  setViewProperties: any;
  viewProperties: ViewProperties;
}

const MapContext = createContext<MapContextType | undefined>(undefined);
export default MapContext;
