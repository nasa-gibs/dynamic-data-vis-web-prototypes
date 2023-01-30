import axios from "axios";
import qs from "qs";

export default async ( date, layer, setResponseID ) => {

    const BASE_URL = "https://d1nzvsko7rbono.cloudfront.net";
    const bandCombo = ["B07", "B05", "B04"];
    const collectionID = layer 
    const layerDate = date.slice(0, 10)
    const temporalRange = [`${layerDate}T00:00:00Z`, `${layerDate}T23:59:59Z`];

    const collectionsFilter = {
        op: "=",
        args: [{ property: "collection" }, collectionID],
    };

    const temporalFilter = {
        op: "t_intersects",
        args: [{ property: "datetime" }, { interval: temporalRange }],
    };

    const searchBody = {
        "filter-lang": "cql2-json",
        context: "on",
        filter: {
        op: "and",
        args: [
            collectionsFilter,
            temporalFilter,
        ]}};

     const mosaicResponse = await axios
     .post(`${BASE_URL}/mosaic/register`, searchBody)
     .then((res) => res.data);

     const tilesHref = mosaicResponse.links.find(
     (link) => link.rel === "tilejson"
     ).href;

     const params = {
     minzoom: 9,
     maxzoom: 14,
     post_process: "swir",
     assets: bandCombo,
     };

     const queryString = qs.stringify(params, { arrayFormat: "repeat" });

     const tilejsonResponse = await axios
     .get(tilesHref, {
       params: new URLSearchParams(queryString),
     })
     .then((res) => res.data);

     const { name } = tilejsonResponse

     setResponseID(name);
}