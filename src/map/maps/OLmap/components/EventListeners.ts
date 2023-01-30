import { useContext } from "react";
import { toLonLat } from "ol/proj";
import { toStringXY } from "ol/coordinate";
import MapContext from "../../../context/MapContext";

const MapEvents = () => {
  const { map, setViewProperties } = useContext(MapContext);

  if (!map) return;

  // listen to event changes after the map has finished moving
  map.on("moveend", function (e) {
    const mapView = map.getView();

    const properties = mapView.getProperties();
    const { center, resolution, rotation, zoom } = properties;

    const zoomFloor = Math.floor(zoom);
    const wgs84Coordinates = toLonLat(center);
    const xyCoordinates = toStringXY(wgs84Coordinates, 4);
    const yxCoordinates = xyCoordinates.split(", ").reverse().join(", ");
    const resolutionFloor = Math.floor(resolution);

    setViewProperties({
      centerCoords: center,
      latlonCoords: yxCoordinates,
      resolution: resolutionFloor,
      rotation: rotation,
      zoom: zoomFloor,
    });
  });

  return null;
};

export default MapEvents;
