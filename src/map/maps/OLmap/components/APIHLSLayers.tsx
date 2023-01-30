import {
  useEffect,
  useContext,
} from "react";
import XYZ from "ol/source/XYZ.js";
import OlLayerTile from "ol/layer/Tile";
import { get } from "ol/proj";
import { useAppSelector } from "../../../../redux/store/hooks";
import MapContext from "../../../context/MapContext";

const OpenLayersHLSLayers = () => {
  const layerResponse = useAppSelector(
    (state) => state.worldview.HLSL30LayerResponse
  );

  const { map } = useContext(MapContext);
  const date = useAppSelector((state) => state.worldview.date);

  useEffect(() => {
    if (!map) return;

    const tileUrlFunction = (tileCoord) => {
      const { name } = layerResponse;
      const z = tileCoord[0] - 1;
      const x = tileCoord[1];
      const y = tileCoord[2];
      const url = `https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/${name}/WGS1984Quad/${z}/${x}/${y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04`;
      console.log(`z:${z} x:${x} y:${y}`);
      return url;
    };

    const xyzSourceOptions = {
      crossOrigin: "anonymous",
      minZoom: 9,
      projection: get("EPSG:4326"),
      tileUrlFunction: tileUrlFunction,
    };

    const xyzSource = new XYZ(xyzSourceOptions);

    const xyzLayerTile = new OlLayerTile({
      source: xyzSource,
      className: "HLSL30.002",
    });

    map.addLayer(xyzLayerTile);
  }, [layerResponse]);

  return null;
};

export default OpenLayersHLSLayers;
