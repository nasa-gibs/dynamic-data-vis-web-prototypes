export interface ResponseDetails {
  title: string;
  url: string;
  applyToMap: boolean;
  description: Array<string>;
  customReference: number;
}

export interface FetchBoxState {
  response: string;
  loading: boolean;
  locationRequest: any;
  leafletZoom: number;
  responseDetails: ResponseDetails;
}

export type FetchBoxActions =
  | { type: "setResponse"; payload: string }
  | { type: "setUrl"; payload: string }
  | { type: "setTitle"; payload: string }
  | { type: "setDescription"; payload: Array<string> }
  | { type: "setApplyToMap"; payload: boolean }
  | { type: "setLoading"; payload: boolean }
  | { type: "setCustomReference"; payload: string }
  | { type: "setLocationRequest"; payload: any }
  | { type: "setLeafletZoom"; payload: number }
  | { type: "setResponseDetails"; payload: any };

export const initialState: FetchBoxState = {
  response: "",
  loading: false,
  locationRequest: [],
  leafletZoom: 9,
  responseDetails: {
    title: "",
    url: "",
    applyToMap: false,
    description: [],
    customReference: -1,
  },
};
