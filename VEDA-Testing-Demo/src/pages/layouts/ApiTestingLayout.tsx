import { useState } from "react";
import { Box, Badge, Switch, Flex, Text, Button } from "@chakra-ui/react";
import OpenLayersMap from "../../map/maps/OLmap/OpenLayersMap";
import LeafletMap from "../../map/maps/LeafletMap/LeafletMap";
import AvailableLayerDisplay from "../../map/maps/displayComponents/layerDisplays/availableLayersDisplay/AvailableLayersDisplay";
import ActiveLayerDisplay from "../../map/maps/displayComponents/layerDisplays/activeLayerDisplay/ActiveLayersDisplay";
import MapContext from "../../map/context/MapContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DateSelector from "../../map/maps/displayComponents/dateSelector/DateSelector";
import FetchBox from '../../map/api-testing/fetchBoxes/FetchBox'
import InstructionModal from "../../map/api-testing/InstructionModal";

const ApiTestingLayout = () => {
  const [map, setMap] = useState(null);

  const [leafletDisplay, setLeafletDisplay] = useState(false);
  const [openLayersDisplay, setOpenLayersDisplay] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [viewProperties, setViewProperties] = useState({
    centerCoords: [-72.7, 42.05],
    latlonCoords: "0, 0",
    resolution: 38496,
    rotation: 0,
    zoom: 7,
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
      <Flex justify="space-between" my="2" id="instructions-displays-container">

      <Flex justify="start" align="center" id="instruction-container">
          <Button onClick={() => setModalOpen(true)} colorScheme="blue">
          Instructions
          </Button>
          <InstructionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          />
        </Flex>

        <Flex justify="center" align="center" id="display-options-container">
          <Text fontWeight="bold">Toggle Map Displays</Text>
          <Box mx="3">
            <Badge variant="outline" colorScheme="green" mx="1">
              Leaflet Map
            </Badge>
            <Switch
              colorScheme="green"
              isChecked={!leafletDisplay}
              onChange={() => setLeafletDisplay(!leafletDisplay)}
            />
          </Box>
          <Box mx="3">
            <Badge variant="outline" colorScheme="blue" mx="1">
              OpenLayers Map
            </Badge>
            <Switch
              colorScheme="blue"
              isChecked={!openLayersDisplay}
              onChange={() => setOpenLayersDisplay(!openLayersDisplay)}
            />
          </Box>
        </Flex>
      </Flex>

      <Flex id="ol-map-fetch-container" mt="2" width="100%">

      <Box id="fetch-box-container" width="25%">
        <FetchBox index={1} />
      </Box>
      
      <Flex flexDirection={"column"} id="maps-container" width="75%">
        <Box hidden={openLayersDisplay} width="100%" id="ol-map-container">
          <Flex justify="center">
            <Badge fontSize={'3xl'} variant="outline" colorScheme="blue">OpenLayers Map</Badge>
          </Flex>
          <OpenLayersMap />
          <Flex>
            <AvailableLayerDisplay />
            <DateSelector />
            <DndProvider backend={HTML5Backend}>
              <ActiveLayerDisplay />
            </DndProvider>
          </Flex>
        </Box>

        <Box hidden={leafletDisplay} width="100%" mt="8" id="leaflet-map-container">
          <Flex justify="center">
          <Badge fontSize={'3xl'} variant="outline" colorScheme="green">Leaflet Map</Badge>
          </Flex>
          <Flex id="OSMAP-container" justify="center">
            <LeafletMap />
          </Flex>
        </Box>

      </Flex>
      </Flex>
    </MapContext.Provider>
  );
};

export default ApiTestingLayout;
