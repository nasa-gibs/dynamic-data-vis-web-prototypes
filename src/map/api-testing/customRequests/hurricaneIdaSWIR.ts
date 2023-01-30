import axios from "axios";
import qs from "qs";
// Update the temporal range in search body and register that search with the Raster API. The registered search id can be reused for alternate map layer visualizations
// see example tutorial (python) https://nasa-impact.github.io/veda-documentation/hls-visualization.html

export default async (
  setResponse,
  setLoading,
  responseId,
  setLocationRequest
) => {
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

  const restrictedTemporalFilter = {
    op: "t_intersects",
    args: [
      { property: "datetime" },
      { interval: ["2021-10-16T00:00:00Z", "2021-10-18T00:00:00Z"] },
    ],
  };

  const searchBody = {
    "filter-lang": "cql2-json",
    filter: {
      op: "and",
      args: [collectionsFilter, spatialFilter, restrictedTemporalFilter],
    },
  };
  // ---- END 1. argument definitions ------

  // ----- REGION 2. fetch tiles -------

  const mosaicResponse = await axios
    .post(`${RASTER_API_URL}/mosaic/register`, searchBody)
    .then((res) => res.data);

  // Set up format for Map API url
  // Get base url for tiler from the register mosaic request
  const tilesHref = mosaicResponse.links.find(
    (link) => link.rel === "tilejson"
  ).href;

  const params = {
    minzoom: 6,
    maxzoom: 12,
    post_process: "swir",
    assets: l30_swir_assets,
  };

  const queryString = qs.stringify(params, { arrayFormat: "repeat" });

  const tilejsonResponse = await axios
    .get(tilesHref, {
      params: new URLSearchParams(queryString),
    })
    .then((res) => res.data);

  setLocationRequest(idaBbox);
  setResponse(tilejsonResponse);
  setLoading(false);
  console.log(`${responseId} fetch complete. Use console to see results.`);

  // ----- END 2. fetch tiles -------
};
