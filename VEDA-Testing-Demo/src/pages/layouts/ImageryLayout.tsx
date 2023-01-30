import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Map from "../../map/maps/OLmap/OpenLayersMap";
import AvailableLayerDisplay from "../../map/maps/displayComponents/layerDisplays/availableLayersDisplay/AvailableLayersDisplay";
import ActiveLayerDisplay from "../../map/maps/displayComponents/layerDisplays/activeLayerDisplay/ActiveLayersDisplay";
import MapContext from "../../map/context/MapContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DateSelector from "../../map/maps/displayComponents/dateSelector/DateSelector";

const ApiTestingLayout = () => {
  // openlayers map obj is a non-serializable value so we cannot store in Redux. Creating local state and passing through context.
  const [map, setMap] = useState(null);

  const [viewProperties, setViewProperties] = useState({
    centerCoords: [0, 0],
    latlonCoords: "0, 0",
    resolution: 38496,
    rotation: 0,
    zoom: 2,
  });

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        setViewProperties,
        viewProperties,
      }}
    >
      <Flex justify="center">
        <Text fontSize="3xl">NASA GIBS Imagery Open Layers</Text>
      </Flex>
      <Map />
      <Flex>
        <AvailableLayerDisplay />
        <DateSelector />
        <DndProvider backend={HTML5Backend}>
          <ActiveLayerDisplay />
        </DndProvider>
      </Flex>
    </MapContext.Provider>
  );
};

export default ApiTestingLayout;
