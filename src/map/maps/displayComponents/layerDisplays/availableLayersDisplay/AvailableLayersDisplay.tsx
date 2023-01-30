import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../redux/store/hooks";
import { setAvailableLayers } from "../../../../../redux/mapSlice/mapSlice";
import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AvailableLayerDisplay = () => {
  const dispatch = useAppDispatch();
  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  const addLayer = (layerID: number) => {
    const newLayerOrder = [...availableLayers];
    const findLayerIndex = (id: number) =>
      availableLayers.findIndex((availLayer) => availLayer.id === id);
    const index = findLayerIndex(layerID);
    let layerToMove = newLayerOrder.splice(index, 1)[0];
    layerToMove = {
      ...layerToMove,
      visible: true,
      active: true,
    };
    newLayerOrder.unshift(layerToMove);

    dispatch(setAvailableLayers(newLayerOrder));
  };

  return (
    <Box
      bg="blue.400"
      borderRadius="md"
      w="33%"
      border="2px"
      borderColor={"black"}
    >
      <Flex align="center" justify="center">
        <Heading size="md" color="white" mb="2" fontWeight="extrabold">
          Available Layers
        </Heading>
      </Flex>
      <Divider borderWidth="1px" mb="2" borderColor="black" />
      <List>
        {availableLayers &&
          availableLayers.map((layer) => {
            if (!layer.active)
              return (
                <ListItem key={layer.name} w="100%" bg="blue.400">
                  <Flex align="center" justify="space-between" w="100%" p="2">
                    <Text color="white">{layer.title}</Text>
                    <IconButton
                      aria-label="Add Layer"
                      size="sm"
                      icon={<AddIcon />}
                      onClick={(e) => addLayer(layer.id)}
                    />
                  </Flex>
                  <Divider borderWidth="1px" borderColor="black" />
                </ListItem>
              );
          })}
      </List>
    </Box>
  );
};

export default AvailableLayerDisplay;
