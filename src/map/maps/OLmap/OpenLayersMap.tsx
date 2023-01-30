import { useRef, useEffect, useContext } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as olProj from "ol/proj";
import "../Map.css";
import config from "../../config/gibsLayersConfig";
import { useAppSelector, useAppDispatch } from "../../../redux/store/hooks";
import AddLayer from "./components/AddLayer";
import MapContext from "../../context/MapContext";
import OpenLayersHLSLayers from "./components/APIHLSLayers";
import MapEvents from "./components/EventListeners";
import { setAvailableLayers } from "../../../redux/mapSlice/mapSlice";

const Map = () => {
  const mapRef = useRef();
  const dispatch = useAppDispatch();
  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  const { map, setMap } = useContext(MapContext);

  const projection = config.projections.geographic;

  useEffect(() => {
    const geoProjection = olProj.get(projection.crs);

    const view = new OlView({
      maxResolution: projection.resolutions[0],
      projection: geoProjection,
      // center: projection.startCenter,
      center: [-72.71, 41.56],
      // zoom: projection.startZoom,
      zoom: 8.2,
      maxZoom: projection.numZoomLevels,
      extent: projection.maxExtent,
      // extent: [-73.7, 41.6, -71.8, 42.05],
      constrainOnlyCenter: true,
    });
    let options = {
      view: view,
      layers: [],
      controls: [],
      overlays: [],
      renderer: ["canvas"],
    };

    let mapObj = new OlMap(options);
    mapObj.setTarget(mapRef.current);
    setMap(mapObj);

    return () => mapObj.setTarget(undefined);
  }, []);

  // reordering layers to match the OL object
  const createOrder = () => {
    const olMapLayers = map.getLayers().array_;
    let newLayers = [...availableLayers];
    const findLayerIndex = (name: string) =>
      availableLayers.findIndex((availLayer) => availLayer.name === name);
    let layerIndexArray = [];

    for (let i = 0; i < olMapLayers.length; i++) {
      const layerName = olMapLayers[i].className_;
      const indexPos = findLayerIndex(layerName);
      layerIndexArray.push(indexPos);
    }

    for (let j = 0; j < layerIndexArray.length; j++) {
      const element = newLayers.splice(layerIndexArray[j], 1)[0];
      newLayers.unshift(element);
    }
    dispatch(setAvailableLayers(newLayers));
  };

  useEffect(() => {
    if (!map) return;
    const olMapLayers = map.getLayers().array_;
    if (!olMapLayers.length) return;
    createOrder();
  }, [map]);

  return (
    <>
      <div ref={mapRef} className="ol-map">
        {availableLayers &&
          availableLayers.map((layer) => {
            if (layer.active)
              return <AddLayer layer={layer.data} key={layer.name} />;
          })}
        <OpenLayersHLSLayers />
        <MapEvents />
      </div>
    </>
  );
};

export default Map;
