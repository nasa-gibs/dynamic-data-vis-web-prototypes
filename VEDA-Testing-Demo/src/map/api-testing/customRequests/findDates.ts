import axios from "axios";
// search the STAC API to find the specific dates available within timeframe of interest (Hurricane Ida)
// see example tutorial (python) https://nasa-impact.github.io/veda-documentation/hls-visualization.html

export default async (setResponse, setLoading, responseId) => {
  // ---- REGION 1. argument definitions ------
  const STAC_API_URL = "https://staging-stac.delta-backend.com";
  const RASTER_API_URL = "https://staging-raster.delta-backend.com";

  const s30CollectionId = "hls-s30-002-ej-reprocessed";
  const s30_swir_assets = ["B12", "B8A", "B04"];
  const s30_vegetation_index_assets = ["B08", "B04"];
  const s30_vegetation_index_expression = "(B08-B04)/(B08+B04)";
  const s30_vegetation_index_rescaling = "0,1";
  const s30_vegetation_index_colormap = "rdylgn";

  const l30_collection_id = "hls-l30-002-ej-reprocessed";
  const l30_swir_assets = ["B07", "B05", "B04"];
  const l30_ndwi_expression = "(B03-B05)/(B03+B05)";
  const l30_ndwi_assets = ["B03", "B05"];
  const l30_ndwi_rescaling = "0,1";
  const l30_ndwi_colormap = "spectral";

  const maria_bbox = [-66.167596, 17.961538, -65.110098, 18.96772];
  const maria_temporal_range = ["2017-06-06T00:00:00Z", "2017-11-30T00:00:00Z"];

  const idaBbox = [-90.932637, 29.705366, -89.766437, 30.71627];
  const idaTemporalRange = ["2021-07-01T00:00:00Z", "2021-10-28T00:00:00Z"];

  const collectionsFilter = {
    op: "=",
    args: [{ property: "collection" }, s30CollectionId],
  };

  const spatialFilter = {
    op: "s_intersects",
    args: [{ property: "bbox" }, idaBbox],
  };

  const temporalFilter = {
    op: "t_intersects",
    args: [{ property: "datetime" }, { interval: idaTemporalRange }],
  };

  // Additional filters can be applied for other search criteria like <= maximum eo:cloud_cover in item properties
  const cloudFilter = {
    op: "<=",
    args: [{ property: "eo:cloud_cover" }, 80],
  };

  // Specify cql2-json filter language in search body and add context for a summary of matched results
  const searchBody = {
    "filter-lang": "cql2-json",
    context: "on",
    filter: {
      op: "and",
      args: [collectionsFilter, spatialFilter, temporalFilter, cloudFilter],
    },
  };
  // ---- END 1. argument definitions ------

  // ---- REGION 2. fetch feature collection of matching features ------
  let stacItemsResponse;

  async function getSTACItems() {
    try {
      const response = await axios.post(`${STAC_API_URL}/search`, searchBody);
      // returns a featureCollection
      stacItemsResponse = response.data;
      setResponse(stacItemsResponse);
    } catch (error) {
      console.error(error);
    }
  }

  await getSTACItems();

  // Check how many items were matched in search
  // ----- END 2. fetch feature collection of matching features ------

  // ----- REGION 3. fetch unique item datetimes ------

  // Iterate over search results to get an array of unique item datetimes
  let datetimes = [];
  let features = stacItemsResponse.features;
  datetimes = datetimes.concat(
    features.map((item) => item.properties.datetime)
  );
  let nextLink = stacItemsResponse.links.find((link) => link.rel === "next");
  while (nextLink) {
    const stacItemsResponse2 = await axios
      .post(`${STAC_API_URL}/search`, nextLink.body)
      .then((res) => res.data);

    features = stacItemsResponse2.features;
    datetimes = datetimes.concat(
      features.map((item) => item.properties.datetime)
    );
    nextLink = stacItemsResponse2.links.find((link) => link.rel === "next");
  }

  const outcome = datetimes.sort();
  setResponse(outcome);
  setLoading(false);
  console.log(`${responseId} fetch complete. Use console to see results.`);
  // ----- END 3. fetch unique item datetimes ------
};
