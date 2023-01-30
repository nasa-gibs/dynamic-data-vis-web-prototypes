import axios from "axios";
import qs from "qs";

export default async (
  setResponse,
  setLoading,
  responseId,
  setLocationRequest
) => {
  // ======= REGION 1: Parameters =============
  // Stac API is for searching for specific dates available within timeframe of interest.
  const STAC_API_URL = "https://staging-stac.delta-backend.com";
  // Raster API is for requesting tiles.
  const RASTER_API_URL = "https://staging-raster.delta-backend.com";
  // Harmonized landsat collection id. Used in collectionsFilter.
  const l30CollectionId = "hls-l30-002-ej-reprocessed";
  // Custom band combination to match WV-2409.
  const l30_swir_assets = ["B07", "B05", "B04"];
  // The following bounding box coords & temporal range are criteria for events in HLS events collection.
  // We need a set of bounding box coordinates. Examples from VEDA were very small.
  // This is a bounding box of the entire northeast of the united states.
  const norEastBbox = [-80.8715, 39.3752, -66.0202, 47.1953];
  // We need a temporal range. Not entirely sure how this is determined.
  // Using the dates that were used in hurricane Ida SWIR example
  const temporalRange = ["2018-07-01T00:00:00Z", "2021-10-28T00:00:00Z"];
  // ======= END REGION 1 =============

  // ======= REGION 2: Set filters for Dates Search ========
  // Now we serch the STAC API to find specific dates available within timeframe of interest (temporalRange?)
  // To focus on specific point in time, we restrict the temporal range when defining the item search
  // Filter the collection
  const collectionsFilter = {
    op: "=",
    args: [{ property: "collection" }, l30CollectionId],
  };
  // Filter the area
  const spatialFilter = {
    op: "s_intersects",
    args: [{ property: "bbox" }, norEastBbox],
  };
  //
  const temporalFilter = {
    op: "t_intersects",
    args: [{ property: "datetime" }, { interval: temporalRange }],
  };
  // Specify cql2-json filter language in search body and add context for a summary of matched results
  // Include all of our filters
  const searchBody = {
    "filter-lang": "cql2-json",
    context: "on",
    filter: {
      op: "and",
      args: [collectionsFilter, spatialFilter, temporalFilter],
    },
  };
  // ======= END REGION 2 =============

  // ======= REGION 3: Search for specific dates within timeframe of interest ========
  // Variable to hold the response
  let stacItemsResponse;
  // Make a POST request to the STAC API with our searchBody
  async function getSTACItems() {
    try {
      const response = await axios.post(`${STAC_API_URL}/search`, searchBody);
      // returns a featureCollection
      stacItemsResponse = response.data;
    } catch (error) {
      console.error(error);
    }
  }
  // This should return an array of dates
  await getSTACItems();

  setLoading(false);
  console.log(`${responseId} fetch complete. Use console to see results.`);
};
