import axios from "axios";
import qs from "qs";

export default async (
  setResponse,
  setLoading,
  responseId,
  setLocationRequest,
  setLeafletZoom
) => {
  // base URL for registering search and requesting tiles
  const BASE_URL = "https://d1nzvsko7rbono.cloudfront.net";
  // ID of the collection
  const collectionID = "HLSL30";
  // Custom band combination to match WV-2409.
  const bandCombo = ["B07", "B05", "B04"];
  // bounding box coordinates for Connecticut
  const bboxCoords = [-73.7249, 41.0022, -71.7798, 42.0777];
  // arbitrary date range
  const temporalRange = ["2023-01-17T00:00:00Z"];
  // filter by collection ID
  const collectionsFilter = {
    op: "=",
    args: [{ property: "collection" }, collectionID],
  };
  // filter search results by bounding box coordinates
  // const spatialFilter = {
  //   op: "s_intersects",
  //   args: [
  //     { property: "bbox" },
  //     bboxCoords,
  //   ],
  // };
  // filter search by date range
  const temporalFilter = {
    op: "t_intersects",
    args: [{ property: "datetime" }, { interval: temporalRange }],
  };
  // combine our filters into a search body to append to register search post request
  const searchBody = {
    "filter-lang": "cql2-json",
    context: "on",
    filter: {
      op: "and",
      args: [
        collectionsFilter,
        // spatialFilter,
        temporalFilter,
      ],
    },
  };
  // registering search which will return a search ID, a metadata link and a tilejson link
  const mosaicResponse = await axios
    .post(`${BASE_URL}/mosaic/register`, searchBody)
    .then((res) => res.data);
  // we select the tilejson link from the mosaicResponse
  const tilesHref = mosaicResponse.links.find(
    (link) => link.rel === "tilejson"
  ).href;
  // setting params for tile request
  const params = {
    minzoom: 9,
    maxzoom: 14,
    post_process: "swir",
    assets: bandCombo,
  };
  // formatting params for tile search request
  const queryString = qs.stringify(params, { arrayFormat: "repeat" });
  // uses the tiles link from the mosaic response with our parameters to request tiles
  const tilejsonResponse = await axios
    .get(tilesHref, {
      params: new URLSearchParams(queryString),
    })
    .then((res) => res.data);
  // set the location in state (& then redux) to fly to coordinates on leaflet map
  setLocationRequest(bboxCoords);
  // set new zoom level for leaflet map
  setLeafletZoom(9);
  // set in the response in state;
  setResponse(tilejsonResponse);
  setLoading(false);
  console.log(`${responseId} fetch complete. Use console to see results.`);
};
