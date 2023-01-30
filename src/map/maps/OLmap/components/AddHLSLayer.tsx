import {
    useEffect,
    useContext,
    useState,
  } from "react";
  import XYZ from "ol/source/XYZ.js";
  import OlLayerTile from "ol/layer/Tile";
  import { get, getPointResolution  } from "ol/proj";
  import { useAppSelector } from "../../../../redux/store/hooks";
  import MapContext from "../../../context/MapContext";
  import registerSearch from './RegisterSearch'


  const AddHLSLayer = ({ layer }) => {

    const { map } = useContext(MapContext)
    const date = useAppSelector((state) => state.worldview.date);
    const availableLayers = useAppSelector(
      (state) => state.worldview.availableLayers
    );
    const [responseID, setResponseID] = useState("")

    useEffect(() => {
        if (!map) return;
        if (layer !== "HLSS30" && layer !== "HLSL30") return;
        registerSearch(date, layer, setResponseID)
    }, [map, date])

    useEffect(() => {
        if (!map) return;
        if (layer !== "HLSS30" && layer !== "HLSL30") return;
        if (!responseID) return;

        const findLayerViz = availableLayers.find((configLayer) => configLayer.title == layer);

        const { visible } = findLayerViz;

        const tileUrlFunction = (tileCoord) => {
            const z = tileCoord[0] - 1;
            const x = tileCoord[1];
            const y = tileCoord[2];
            const url = `https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/${responseID}/WGS1984Quad/${z}/${x}/${y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04`;
            // console.log(`z:${z} x:${x} y:${y}`);
            return url;
          };

          const xyzSourceOptions = {
            crossOrigin: "anonymous",
            projection: get("EPSG:4326"),
            tileUrlFunction: tileUrlFunction,
          };
      
          const xyzSource = new XYZ(xyzSourceOptions);

          const xyzLayerTile = new OlLayerTile({
            source: xyzSource,
            className: layer,
            visible,
            minZoom: 8
          });

          map.addLayer(xyzLayerTile)

          return () => {
            if (map) {
              map.removeLayer(xyzLayerTile);
            }
          };

    }, [responseID])

    return null;
  }

  export default AddHLSLayer