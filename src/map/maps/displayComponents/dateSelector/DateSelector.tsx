import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Flex, Badge } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { setDate } from "../../../../redux/mapSlice/mapSlice";
import "./DateSelector.css";
import MapContext from "../../../context/MapContext";

const DateSelector = () => {
  const { viewProperties, map } = useContext(MapContext);
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.worldview.date);
  const myDate = new Date(Date.parse(date));

  const centerCoords = viewProperties.centerCoords;
  const lat = centerCoords[1].toFixed(2);
  const lon = centerCoords[0].toFixed(2);

  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  const testFunction = () => {
    const olMapLayers = map.getLayers().array_;
    console.log(olMapLayers)
    console.log(availableLayers)
  };

  return (
    <Flex w="33%" flexDirection={"column"} align="center">
      <div>
        <DatePicker
          selected={myDate}
          onChange={(myDate) => dispatch(setDate(myDate.toISOString()))}
          id="datePicker"
        />
      </div>
      <Box mt="4">
        <Badge
          borderRadius={"19px"}
          colorScheme="blue"
          mx="1"
          p="4"
          fontSize={"base"}
        >
          Zoom: {viewProperties.zoom}
        </Badge>
      </Box>
      <Box mt="4">
        <Badge
          borderRadius={"19px"}
          colorScheme="blue"
          mx="1"
          p="4"
          fontSize={"base"}
        >
          Lat: {lat} Lon: {lon}
        </Badge>
      </Box>
      <Box mt="4">
        <Button colorScheme="blue" onClick={testFunction}>
          Test Trigger
        </Button>
      </Box>
    </Flex>
  );
};

export default DateSelector;
