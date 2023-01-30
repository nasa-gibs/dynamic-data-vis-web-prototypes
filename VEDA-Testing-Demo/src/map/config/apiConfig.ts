export const apiCalls = [
  {
    title: "VEDA List All Collections",
    url: "https://staging-stac.delta-backend.com/",
    description: "Get a list of all the available collections for VEDA API`",
    applyToMap: false,
  },
  {
    title: "VEDA Hurricane Ida SWIR (MAP)",
    url: "customRequest",
    description:
      "Imagery from VEDA API for 2021 Hurricane Ida using the built-in SWIR post processing algorithm, post_process=swir, assets=[B07/B05/B04]",
    customReference: "3",
    applyToMap: true,
  },
  {
    title: "VEDA Hurricane Ida Color Map (MAP)",
    url: "customRequest",
    description:
      "Imagery from VEDA API for 2021 Hurricane Ida using color map & rescaling & expression, assets=B08/B04, expression=(B08-B04)/(B08+B04), rescale=0/1, colormap_name=rdylgn",
    customReference: "4",
    applyToMap: true,
  },
  {
    title: "VEDA Hurricane Maria L30 (MAP)",
    url: "customRequest",
    description:
      "Imagery from the VEDA API for 2017 Hurricane Maria using color map & rescaling & expression, assets=B03/B05, expression=(B03-B05)/(B03+B05), rescale=0/1, colorMap=viridis",
    customReference: "5",
    applyToMap: true,
  },
  {
    title: "FIRMS API HLSS30 Connecticut (MAP)",
    url: "customRequest",
    description:
      "collection=HLSS30, bbox=Connecticut, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14",
    customReference: "7",
    applyToMap: true,
  },
  {
    title: "FIRMS API HLSL30 Oregon (MAP)",
    url: "customRequest",
    description:
      "collection=HLSS30, bbox=Oregon, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04 post_process=swir, minzoom=9, maxzoom=14",
    customReference: "8",
    applyToMap: true,
  },
  {
    title: "FIRMS API HLSL30 FL (MAP)",
    url: "customRequest",
    description:
      "collection=HLSS30, bbox=SouthFlorida, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14",
    customReference: "10",
    applyToMap: true,
  },
  {
    title: "FIRMS HLSS No Bbox (MAP)",
    url: "customRequest",
    description:
      "collection=HLSS30, bbox=n/a, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14, You should be able to pan anywhere on a Leaflet map and if zoomed enough should render tiles, These specific parameters don't seem to work well on OL map",
    customReference: "11",
    applyToMap: true,
  },
  {
    title: "FIRMS HLSS Min Date Only (MAP)",
    url: "customRequest",
    description:
      "collection=HLSS30, bbox=n/a, temporalRange=3/15/2022, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14, You should be able to pan anywhere on both maps and if zoomed enough should render tiles",
    customReference: "12",
    applyToMap: true,
  },
  {
    title: "FIRMS HLSL Min Date Only (MAP)",
    url: "customRequest",
    description:
      "collection=HLSL30, bbox=n/a, temporalRange=3/15/2022, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14, You should be able to pan anywhere on both maps and if zoomed enough should render tiles",
    customReference: "13",
    applyToMap: true,
  },
  {
    title: "FIRMS HLSL 2 Week Range (MAP)",
    url: "customRequest",
    description:
      "collection=HLSL30, bbox=n/a, temporalRange=01/01/2022, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14, You should be able to pan anywhere on both maps and if zoomed enough should render tiles",
    customReference: "14",
    applyToMap: true,
  },
  {
    title: "FIRMS HLSS Date Match (MAP)",
    url: "customRequest",
    description:
      "collection=HLSS30, bbox=n/a, temporalRange=app date, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14, You should be able to pan anywhere on both maps and if zoomed enough should render tiles",
    customReference: "15",
    applyToMap: true,
  },
];
