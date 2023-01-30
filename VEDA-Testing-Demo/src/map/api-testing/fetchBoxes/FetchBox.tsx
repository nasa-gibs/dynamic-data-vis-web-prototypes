import { useEffect, useReducer } from "react";
import {
  Button,
  Flex,
  Heading,
  ListIcon,
  List,
  ListItem,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { PhoneIcon, InfoIcon } from "@chakra-ui/icons";
import { GiSave, GiMaterialsScience } from "react-icons/gi";
import { GoGlobe } from "react-icons/go";
import "../../maps/Map.css";
import { apiCalls } from "../../config/apiConfig";
import {
  testResponseOneData,
  testResponseTwoData,
} from "../dataTestingFunctions";
import { useAppSelector, useAppDispatch } from "../../../redux/store/hooks";
import {
  setHLSL30LayerResponse,
  setRequestLocation,
  setLeafletZoom as setLeafletZoomRedux,
} from "../../../redux/mapSlice/mapSlice";
// Import any custom request files you make here
import findDatesWithinTimeframe from "../customRequests/findDates";
import registerSearch from "../customRequests/registerSearch";
import hurricaneIdaSWIR from "../customRequests/hurricaneIdaSWIR";
import hurricaneIdaColor from "../customRequests/hurricaneIdaColor";
import hurricaneMariaL30 from "../customRequests/hurricaneMariaL30";
import SWIR from "../customRequests/SWIR";
import FirmsHLSS30CT from "../customRequests/FIRMSHLSS30CT";
import FirmsHLSL30OR from "../customRequests/FIRMSHLSL30OR";
import FirmsHLSL30US from "../customRequests/FIRMSHLSL30US";
import FirmsHLSL30FL from "../customRequests/FIRMSHLSL30FL";
import HLSSnoBbox from "../customRequests/HLSSnoBbox";
import HLSSminDate from "../customRequests/HLSSminDate";
import HLSLminDate from "../customRequests/HLSLminDate";
import HLSS3DayRange from "../customRequests/HLSS3DayRange";
import HLSSmatchDate from "../customRequests/HLSSmatchDate";

import {
  FetchBoxActions,
  FetchBoxState,
  ResponseDetails,
  initialState,
} from "./FetchBoxTypes";

const FetchBox = ({ index }) => {
  const fetchBoxReducer = (state: FetchBoxState, action: FetchBoxActions) => {
    switch (action.type) {
      case "setResponse":
        return { ...state, response: action.payload };
      case "setLoading":
        return { ...state, loading: action.payload };
      case "setLocationRequest":
        return { ...state, locationRequest: action.payload };
      case "setLeafletZoom":
        return { ...state, leafletZoom: action.payload };
      case "setResponseDetails":
        return { ...state, responseDetails: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchBoxReducer, initialState);
  const { response, loading, locationRequest, leafletZoom, responseDetails } =
    state;

  const setResponse = (response: string) => {
    dispatch({ type: "setResponse", payload: response });
  };

  const setResponseDetails = (responseDetails: ResponseDetails) => {
    dispatch({ type: "setResponseDetails", payload: responseDetails });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "setLoading", payload: loading });
  };

  const setLocationRequest = (locationRequest: any) => {
    dispatch({ type: "setLocationRequest", payload: locationRequest });
  };

  const setLeafletZoom = (leafletZoom: number) => {
    dispatch({ type: "setLeafletZoom", payload: leafletZoom });
  };

  const dispatchReduxAction = useAppDispatch();
  const date = useAppSelector((state) => state.worldview.date);

  const customRequestHandler = (setResponse, setLoading, responseId) => {
    // Make a new case that refers to the customReference value you created in apiConfig.tsx and make sure to pass it setResponse as an argument.
    switch (responseDetails.customReference) {
      case "1":
        setLoading(true);
        findDatesWithinTimeframe(setResponse, setLoading, responseId);
        break;
      case "2":
        setLoading(true);
        registerSearch(setResponse, setLoading, responseId);
        break;
      case "3":
        setLoading(true);
        hurricaneIdaSWIR(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest
        );
        break;
      case "4":
        setLoading(true);
        hurricaneIdaColor(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest
        );
        break;
      case "5":
        setLoading(true);
        hurricaneMariaL30(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest
        );
        break;
      case "6":
        setLoading(true);
        SWIR(setResponse, setLoading, responseId, setLocationRequest);
        break;
      case "7":
        setLoading(true);
        FirmsHLSS30CT(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "8":
        setLoading(true);
        FirmsHLSL30OR(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "9":
        setLoading(true);
        FirmsHLSL30US(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "10":
        setLoading(true);
        FirmsHLSL30FL(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "11":
        setLoading(true);
        HLSSnoBbox(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "12":
        setLoading(true);
        HLSSminDate(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "13":
        setLoading(true);
        HLSLminDate(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "14":
        setLoading(true);
        HLSS3DayRange(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom
        );
        break;
      case "15":
        setLoading(true);
        HLSSmatchDate(
          setResponse,
          setLoading,
          responseId,
          setLocationRequest,
          setLeafletZoom,
          date
        );
        break;
      case "default":
        console.log(
          "Invalid reference. Make sure to include a unique customReference in the apiConfig file and make a case in the switch statement."
        );
    }
  };

  async function getResponse() {
    if (responseDetails.url === "customRequest") {
      customRequestHandler(setResponse, setLoading, "Response" + index);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(responseDetails.url);
      const data = response.data;
      setResponse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log(`Fetch complete. Use console to see results.`);
    }
  }

  const consoleResponse = () => {
    console.log(response);
  };

  const handleSelect = (e) => {
    if (!e.target.value) return;
    const value = JSON.parse(e.target.value);
    const descriptionValues = value.description
      .split(",")
      .map((value) => value);

    setResponseDetails({
      title: value.title,
      url: value.url,
      applyToMap: value.applyToMap,
      customReference: value.customReference,
      description: descriptionValues,
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(`API_Response_${index}`, JSON.stringify(response));
    console.log("Response saved to local storage.");
  };

  const fetchLocalStorage = () => {
    const lsData = localStorage.getItem(`API_Response_${index}`);
    if (!lsData) {
      console.log(`No data found in local storage for response ${index}.`);
    }
    const response = JSON.parse(lsData);
    index == 1 ? testResponseOneData(response) : testResponseTwoData(response);
  };

  const handleAddToMap = () => {
    dispatchReduxAction(setHLSL30LayerResponse(response));
  };

  useEffect(() => {
    if (!locationRequest) return;
    dispatchReduxAction(setRequestLocation(locationRequest));
    dispatchReduxAction(setLeafletZoomRedux(leafletZoom));
  }, [locationRequest]);

  return (
    <>
      <Flex
        justify="space-around"
        align="center"
        my="2"
        id="fetch-button-container"
      >
        <Button
          aria-label="fetch"
          colorScheme="blue"
          size="lg"
          onClick={getResponse}
          isLoading={loading}
          isDisabled={!responseDetails.url}
        >
          <PhoneIcon mr="2" /> Fetch
        </Button>
      </Flex>
      <Flex w="100%" bg="gray.100" h="350px" id="api-response-container">
        <Flex
          align="center"
          direction="column"
          h="100%"
          w="100%"
          border="2px solid black"
          className="text-container"
        >
          <Select
            defaultValue="disabled"
            id="select1"
            bg="blue.300"
            borderRadius="0"
            textAlign="center"
            fontWeight="bold"
            onChange={(e) => handleSelect(e)}
          >
            <option value="disabled" disabled>
              Select an API Request
            </option>
            {apiCalls.map((call) => {
              return (
                <option
                  key={call.title}
                  value={JSON.stringify({
                    url: call.url,
                    description: call.description,
                    title: call.title,
                    customReference: call.customReference,
                    applyToMap: call.applyToMap,
                  })}
                >
                  {call.title}
                </option>
              );
            })}
          </Select>
          <Heading textAlign="center" size="md" my="2" maxWidth="320px">
            {responseDetails.title}
          </Heading>
          <List>
            {responseDetails.description?.map((value) => {
              return (
                <ListItem key={value} fontSize="small">
                  <ListIcon as={InfoIcon} color="green.500" />
                  {value}
                </ListItem>
              );
            })}
          </List>
        </Flex>
      </Flex>
      <Flex
        justify="space-around"
        align="center"
        my="2"
        id="button-options-container"
      >
        <Flex>
          <Flex direction="column">
            <Button
              aria-label="fetch"
              colorScheme="blue"
              size="md"
              onClick={consoleResponse}
              isLoading={loading}
              disabled={!response}
              mb="2"
            >
              <InfoIcon className="iconButton" /> Console
            </Button>
            <Button
              aria-label="save"
              colorScheme="blue"
              size="md"
              isDisabled={!response}
              id="save1"
              onClick={saveToLocalStorage}
              isLoading={loading}
            >
              <GiSave className="iconButton" /> Save
            </Button>
          </Flex>
          <Flex direction="column" ml="1" mr="1">
            <Button
              aria-label="test data"
              colorScheme="blue"
              size="md"
              onClick={fetchLocalStorage}
              isLoading={loading}
              mb="2"
            >
              <GiMaterialsScience className="iconButton" /> Test Data
            </Button>
            <Button
              aria-label="apply to map"
              colorScheme="blue"
              size="md"
              isLoading={loading}
              onClick={handleAddToMap}
              isDisabled={!responseDetails.applyToMap || !response}
              mb="2"
            >
              <GoGlobe className="iconButton" /> Apply To Map
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default FetchBox;
