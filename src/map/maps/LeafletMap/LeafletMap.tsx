import { useState, useEffect, useRef, useReducer } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { CRS } from "leaflet";
import { Badge, Flex, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useAppSelector } from "../../../redux/store/hooks";
import "../Map.css";
import OpenStreetLayers from "./components/LeafletLayers";

const initialState = {
  lat: 28.3852,
  lon: -81.5639,
  zoom: 9,
  layerToAdd: "",
};

type State = {
  lat: number;
  lon: number;
  zoom: number;
  layerToAdd: string;
};

type Action =
  | { type: "setLat"; payload: number }
  | { type: "setLon"; payload: number }
  | { type: "setZoom"; payload: number }
  | { type: "addLayer"; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setLat":
      return { ...state, lat: action.payload };
    case "setLon":
      return { ...state, lon: action.payload };
    case "setZoom":
      return { ...state, zoom: action.payload };
    case "addLayer":
      return { ...state, layerToAdd: action.payload };
    default:
      console.error(`Unhandled action type`);
      return state;
  }
};

const LeafletMap = () => {
  const mapRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lat, lon, zoom, layerToAdd } = state;

  const setLat = (lat: number) => {
    dispatch({ type: "setLat", payload: lat });
  };
  const setLon = (lon: number) => {
    dispatch({ type: "setLon", payload: lon });
  };
  const setZoom = (zoom: number) => {
    dispatch({ type: "setZoom", payload: zoom });
  };
  const addLayer = (layerToAdd: string) => {
    dispatch({ type: "addLayer", payload: layerToAdd });
  };

  // get API response from redux
  const HLSL30LayerResponse = useAppSelector(
    (state) => state.worldview.HLSL30LayerResponse
  );

  const locationRequest = useAppSelector(
    (state) => state.worldview.requestLocation
  );

  useEffect(() => {
    const { tiles, name } = HLSL30LayerResponse;
    if (!name) return;

    const location = [
      (locationRequest[1] + locationRequest[3]) / 2,
      (locationRequest[0] + locationRequest[2]) / 2,
    ];

    setLat(location[0]);
    setLon(location[1]);

    addLayer(tiles[0]);
  }, [HLSL30LayerResponse]);

  const [flyTrigger, setFlyTrigger] = useState(false);
  const [requestLeafletImagery, setRequestLeafletImagery] = useState(true);

  return (
    <Flex flexDirection={"column"}>
      <Flex flexDirection="row" alignItems="center" justify={"center"}>
        <Flex justify={"center"} pb="3" ml="4">
          <FormControl display="flex" alignItems="center" mt={"4"}>
            <FormLabel htmlFor="email-alerts" mb="0" textAlign={"center"}>
              Request Imagery on Leaflet Map?
            </FormLabel>
            <Switch
              id="leaflet-img-switch"
              colorScheme={"green"}
              isChecked={requestLeafletImagery}
              onChange={() => setRequestLeafletImagery(!requestLeafletImagery)}
            />
          </FormControl>
        </Flex>
        <Flex ml={"3"}>
          <Badge
            fontSize={"large"}
            colorScheme="green"
            p="2"
            borderRadius={"base"}
            variant="subtle"
          >
            Zoom: {zoom}
          </Badge>
        </Flex>
      </Flex>
      <MapContainer
        ref={mapRef}
        center={[lat, lon]}
        zoom={zoom}
        scrollWheelZoom={true}
        crs={CRS.EPSG3857}
        id="leaflet-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <OpenStreetLayers
          layerToAdd={layerToAdd}
          addLayer={addLayer}
          lat={lat}
          lon={lon}
          zoom={zoom}
          flyTrigger={flyTrigger}
          setFlyTrigger={setFlyTrigger}
          setZoom={setZoom}
          requestLeafletImagery={requestLeafletImagery}
        />
      </MapContainer>
    </Flex>
  );
};

export default LeafletMap;
