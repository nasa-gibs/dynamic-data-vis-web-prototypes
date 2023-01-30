import { useCallback } from "react";
import { Flex, Heading, List, Divider } from "@chakra-ui/react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../redux/store/hooks";
import { setAvailableLayers } from "../../../../../redux/mapSlice/mapSlice";
import OrderedLayers from "./OrderedLayers";

const DragDropDisplay = ({ toggleVisibility, removeLayer }) => {
  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  const dispatch = useAppDispatch();

  const moveLayerListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = availableLayers[dragIndex];
      const hoverItem = availableLayers[hoverIndex];

      const updatedLayers = [...availableLayers];
      updatedLayers[dragIndex] = hoverItem;
      updatedLayers[hoverIndex] = dragItem;
      dispatch(setAvailableLayers(updatedLayers));
    },
    [availableLayers]
  );

  return (
    <>
      <Flex align="center" justify="center">
        <Heading size="md" color="white" mb="2" fontWeight="extrabold">
          Active Layers
        </Heading>
      </Flex>
      <Divider borderWidth="1px" mb="2" borderColor="black" />
      <List>
        {availableLayers &&
          availableLayers.map((layer, index) => {
            if (layer.active)
              return (
                <OrderedLayers
                  key={layer.name}
                  layer={layer}
                  index={index}
                  moveLayerListItem={moveLayerListItem}
                  toggleVisibility={toggleVisibility}
                  removeLayer={removeLayer}
                />
              );
          })}
      </List>
    </>
  );
};

export default DragDropDisplay;
