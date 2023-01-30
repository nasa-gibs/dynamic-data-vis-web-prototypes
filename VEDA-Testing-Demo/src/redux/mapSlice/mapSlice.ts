import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import startingLayers from "../../map/config/availableLayersConfig";
import { startingDate } from "../../map/selectors/selectors";

interface HLSL30LayerResponse {
  bounds: Array<number>;
  center: Array<number>;
  maxzoom: number;
  minzoom: number;
  name: string;
  scheme: string;
  tilejson: string;
  tiles: Array<string>;
  version: string;
}

const HLSL30LayerResponse: HLSL30LayerResponse = {
  bounds: [],
  center: [],
  maxzoom: 0,
  minzoom: 0,
  name: "",
  scheme: "",
  tilejson: "",
  tiles: [],
  version: "",
};

const initialState = {
  availableLayers: startingLayers,
  date: startingDate,
  HLSL30LayerResponse: HLSL30LayerResponse,
  requestLocation: [],
  leafletZoom: 9,
};

export const worldviewSlice = createSlice({
  name: "worldview",
  initialState,
  reducers: {
    setAvailableLayers: (state, action: PayloadAction<any>) => {
      state.availableLayers = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setHLSL30LayerResponse: (state, action: PayloadAction<any>) => {
      state.HLSL30LayerResponse = action.payload;
    },
    setRequestLocation: (state, action: PayloadAction<any>) => {
      state.requestLocation = action.payload;
    },
    setLeafletZoom: (state, action: PayloadAction<number>) => {
      state.leafletZoom = action.payload;
    },
  },
});

export const {
  setAvailableLayers,
  setDate,
  setHLSL30LayerResponse,
  setRequestLocation,
  setLeafletZoom,
} = worldviewSlice.actions;
export default worldviewSlice.reducer;
