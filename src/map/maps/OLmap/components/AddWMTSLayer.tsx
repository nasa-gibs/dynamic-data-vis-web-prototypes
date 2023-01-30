import React, { useEffect, useContext } from "react";
import OlTileGridWMTS from "ol/tilegrid/WMTS";
import OlSourceWMTS from "ol/source/WMTS";
import OlLayerTile from "ol/layer/Tile";
import config from "../../../config/gibsLayersConfig";
import {
  calcExtentsFromLimits,
  toISOStringSeconds,
  roundTimeOneMinute,
} from "../../../selectors/selectors";
import { useAppSelector } from "../../../../redux/store/hooks";
import MapContext from "../../../context/MapContext";

const AddWMTSLayer = ({ layer }) => {
  const { map } = useContext(MapContext);

  const date = useAppSelector((state) => state.worldview.date);
  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  useEffect(() => {
    if (!map) return;
    if (layer === "HLSS30" || layer === "HLSL30") return;

    const {
      id,
      format,
      matrixIds,
      matrixSet = layer.projections.geographic.matrixSet,
      matrixSetLimits,
      style,
    } = layer;

    const findLayerViz = availableLayers.find((layer) => layer.name == id);

    const { visible } = findLayerViz;

    const configSource = config.sources["GIBS:geographic"];
    const configMatrixSet = configSource.matrixSets[matrixSet];
    const layerDate = date;
    const { tileMatrices, resolutions, tileSize } = configMatrixSet;
    const day = 0;
    const selected = config.projections.geographic;
    const { origin, extent } = calcExtentsFromLimits(
      configMatrixSet,
      matrixSetLimits,
      day,
      selected
    );
    const sizes = !tileMatrices
      ? []
      : tileMatrices.map(({ matrixWidth, matrixHeight }) => [
          matrixWidth,
          matrixHeight,
        ]);
    const urlParameters = `?TIME=${toISOStringSeconds(
      roundTimeOneMinute(layerDate)
    )}`;
    const sourceURL = layer.sourceOverride || configSource.url;

    const tileGridOptions = {
      origin: origin,
      extent: extent,
      sizes,
      resolutions,
      matrixIds: matrixIds || resolutions.map((set, index) => index),
      tileSize: tileSize[0],
    };

    const sourceOptions = {
      url: sourceURL + urlParameters,
      layer: id,
      cacheSize: 4096,
      crossOrigin: "anonymous",
      format,
      transition: 0,
      matrixSet: configMatrixSet.id,
      tileGrid: new OlTileGridWMTS(tileGridOptions),
      wrapX: false,
      style: typeof style === "undefined" ? "default" : style,
    };

    const tileSource = new OlSourceWMTS(sourceOptions);

    const layerTile = new OlLayerTile({
      extent: extent,
      preload: 0,
      source: tileSource,
      className: id,
      visible,
    });

    map.addLayer(layerTile);

    // componentWillUnmount
    return () => {
      if (map) {
        map.removeLayer(layerTile);
      }
    };
  }, [map, date]);

  return null;
};

export default AddWMTSLayer;
