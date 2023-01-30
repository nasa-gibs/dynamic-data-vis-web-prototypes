const layerDefinition = {
  id: "aws_sentinel",
  title: "AWS Sentinel",
  type: "xyz",
  tag: "sentinel",
  handler: "sentinel",
  replace: [
    "collection",
    "HLSS30",
    "subset",
    "assets=B04&assets=B03&assets=B02",
  ],
  minDate: "2022-03-15",
  trackLoading: true,
  iconMatrix: [0, 5],
  maxLevel: 14,
  minLevel: 9,
  props: {
    projection: "EPSG:4326",
    url: "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/#searchid#/WGS1984Quad/{z}/{x}/{y}@1x?#subset#&post_process=swir",
    tileSize: 256,
    query: "https://d1nzvsko7rbono.cloudfront.net/mosaic/register",
    tileUrlFunction: [
      "function(tileCoord) {",
      "return updateSentinelTileUrl('#id#', tileCoord);}",
    ],
    wrapX: true,
  },
};

export default async (
  setResponse,
  setLoading,
  responseId,
  setLocationRequest,
  setLeafletZoom
) => {};
