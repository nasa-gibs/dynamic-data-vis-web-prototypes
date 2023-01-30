import config from "../../../config/gibsLayersConfig";

export const urls = {
  baseURL1: "https://d1nzvsko7rbono.cloudfront.net/",

  baseURL2: "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/",

  ctURL1:
    "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WGS1984Quad/{z}/{x}/{y}@1x?assets=B07&assets=B05&assets=B04&post_process=swir",

  ctURL2:
    "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WGS1984Quad/{z}/{x}/{y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04",

  presetFIRMS:
    "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/4c640d25fd8dd78aef47721a71ee8e96/WGS1984Quad/9/561/132@1x?assets=B07&assets=B05&assets=B04&post_process=swir",

  ctTileEx:
    "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WGS1984Quad/9/153/189@1x?assets=B07&assets=B05&assets=B04&post_process=swir",

  test: "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WGS1984Quad/{z}/{x}/{y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04",
};

export const origins = {
  worldOrigin: [-180, 90],
  ctOrigin: [-72.08, 41.6],
};

export const extents = {
  worldExtent: [-180, -90, 180, 90],
  ctExtent: [-180, -90, 180, 90],
};

export const resolutions = {
  nineResolutions: [
    0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125, 0.0087890625,
    0.00439453125, 0.002197265625,
  ],
};

export const matrixIds = undefined;

export const matrixSets = {
  twoKmMatrixSet: "2km",
};

export const configSources = {
  geoConfigSource: config.sources["GIBS:geographic"],
};

export const configMatrixSets = {
  configTwoKmMatrixSet:
    configSources.geoConfigSource.matrixSets[matrixSets.twoKmMatrixSet],
};

export const style = undefined;

// ------ WMTS method -------
// const tileGridOptions = {
//     origin: ctOrigin,
//     extent: ctExtent,
//     tileSize: 256,
//     resolutions: nineResolutions,
//     matrixIds: matrixIds || nineResolutions.map((set, index) => index),
//   }

//   const sourceOptions = {
//     url: ctURL1,
//     layer: "HLSL30.002",
//     crossOrigin: 'anonymous',
//     tileGrid: new OlTileGridWMTS(tileGridOptions),
//     wrapX: false,
//     style: typeof style === 'undefined' ? 'default' : style,
//     matrixSet: 'EPSG:4326',
//     format: 'image/png',
//     tileLoadFunction: (imageTile, src) => {
//       console.log('Tile loaded: ', src);
//       console.log('Tile coordinates: ', imageTile.getTileCoord());
//       console.log('Tile resolution: ', imageTile.getTileCoord()[0]);
//     }
//   }

//   const tileSource = new OlSourceWMTS(sourceOptions);

//   const layerTile = new OlLayerTile({
//     source: tileSource,
//     className: "HLSL30.002",
//     preload: 0,
//   })
// ------ END WMTS method -------
