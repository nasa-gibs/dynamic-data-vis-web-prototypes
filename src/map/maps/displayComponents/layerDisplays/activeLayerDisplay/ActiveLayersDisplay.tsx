import { useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";
import MapContext from "../../../../context/MapContext";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../redux/store/hooks";
import { setAvailableLayers } from "../../../../../redux/mapSlice/mapSlice";
import DragDropDisplay from "./DragDropDisplay";

const ActiveLayerDisplay = () => {
  const { map } = useContext(MapContext);
  const dispatch = useAppDispatch();
  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );
  const date = useAppSelector((state) => state.worldview.date)

  // toggling visibility from switches
  const toggleVisibility = (layerName: string, layerID: number) => {
    map.getLayers().forEach((layer: any) => {
      if (layer.className_ === layerName) {
        const isVisible = layer.get("visible");
        layer.setVisible(!isVisible);
      }
    });

    const newLayerProperties = [...availableLayers];
    const findLayerIndex = (id: number) =>
      availableLayers.findIndex((availLayer) => availLayer.id === id);
    const index = findLayerIndex(layerID);
    const layerToUpdate = newLayerProperties[index];
    const isVisible = layerToUpdate.visible;

    newLayerProperties[index] = {
      ...layerToUpdate,
      visible: !isVisible,
    };

    dispatch(setAvailableLayers(newLayerProperties));
  };

  const removeLayer = (layerName, layerID) => {
    const olMapLayers = map.getLayers().array_;

    olMapLayers.forEach((layer) => {
      if (layer.className_ === layerName) {
        map.removeLayer(layer);
      }
    });

    const newLayerOrder = [...availableLayers];
    const findLayerIndex = (id: number) =>
      availableLayers.findIndex((availLayer) => availLayer.id === id);
    const index = findLayerIndex(layerID);
    const layerToUpdate = newLayerOrder[index];

    newLayerOrder[index] = {
      ...layerToUpdate,
      visible: true,
      active: false,
    };

    dispatch(setAvailableLayers(newLayerOrder));
  };

  // this gets called whenever a layer is added, removed or reordered
  const updateMapLayersOnReorder = () => {
    const olMapLayers = map.getLayers().array_;
    let removedLayers = [];

    olMapLayers.slice().forEach((layer) => {
      removedLayers.push(layer);
      map.removeLayer(layer);
    });

    const reversedLayers = [...availableLayers].reverse();

    reversedLayers.map((layer) => {
      removedLayers.forEach((layerObj) => {
        if (layer.name === layerObj.className_) {
          map.addLayer(layerObj);
        }
      });
    });
  };

  useEffect(() => {
    if (!map) return;
    const olMapLayers = map.getLayers().array_;
    if (!olMapLayers.length) return;
    updateMapLayersOnReorder();
  }, [availableLayers, date]);

  return (
    <Box
      bg="blue.400"
      borderRadius="md"
      w="33%"
      border="2px"
      borderColor={"black"}
    >
      <DragDropDisplay
        toggleVisibility={toggleVisibility}
        removeLayer={removeLayer}
      />
    </Box>
  );
};

export default ActiveLayerDisplay;
