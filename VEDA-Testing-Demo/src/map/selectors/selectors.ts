export const LEFT_WING_EXTENT = [-250, -90, -180, 90];
export const CENTER_MAP_EXTENT = [180, -90, -180, 90];
export const RIGHT_WING_EXTENT = [180, -90, 250, 90];
export const FULL_MAP_EXTENT = [-250, -90, 250, 90];
export const LEFT_WING_ORIGIN = [-540, 90];
export const RIGHT_WING_ORIGIN = [180, 90];
export const CENTER_MAP_ORIGIN = [-180, 90];

export const toISOStringSeconds = function (date) {
  const isString = typeof date === "string" || date instanceof String;
  const dateString = isString ? date : date.toISOString();
  return `${dateString.split(".")[0]}Z`;
};

export const roundTimeOneMinute = function (time) {
  const timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
    Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
  );
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes()));
  return timeToReturn;
};

export const calcExtentsFromLimits = (
  matrixSet,
  matrixSetLimits,
  day,
  proj
) => {
  let extent;
  let origin;

  switch (day) {
    case 1:
      extent = LEFT_WING_EXTENT;
      origin = LEFT_WING_ORIGIN;
      break;
    case -1:
      extent = RIGHT_WING_EXTENT;
      origin = RIGHT_WING_ORIGIN;
      break;
    default:
      extent = proj.maxExtent;
      origin = [extent[0], extent[3]];
      break;
  }

  const resolutionLen = matrixSet.resolutions.length;
  const setlimitsLen = matrixSetLimits && matrixSetLimits.length;

  // If number of set limits doesn't match sets, we are assuming this product
  // crosses the anti-meridian and don't have a reliable way to calculate a single
  // extent based on multiple set limits.
  if (!matrixSetLimits || setlimitsLen !== resolutionLen || day) {
    return { origin, extent };
  }

  const limitIndex = resolutionLen - 1;
  const resolution = matrixSet.resolutions[limitIndex];
  const tileWidth = matrixSet.tileSize[0] * resolution;
  const tileHeight = matrixSet.tileSize[1] * resolution;
  const { minTileCol, maxTileRow, maxTileCol, minTileRow } =
    matrixSetLimits[limitIndex];
  const minX = extent[0] + minTileCol * tileWidth;
  const minY = extent[3] - (maxTileRow + 1) * tileHeight;
  const maxX = extent[0] + (maxTileCol + 1) * tileWidth;
  const maxY = extent[3] - minTileRow * tileHeight;

  return {
    origin,
    extent: [minX, minY, maxX, maxY],
  };
};

/**
 * Create x/y/z vectortile requester url
 * @param {Date} date
 * @param {string} layerName
 * @param {String} tileMatrixSet
 *
 * @return {String} URL
 */
export function createVectorUrl(date, layerName, tileMatrixSet) {
  const time = toISOStringSeconds(roundTimeOneMinute(date));
  const params = [
    `TIME=${time}`,
    `layer=${layerName}`,
    `tilematrixset=${tileMatrixSet}`,
    "Service=WMTS",
    "Request=GetTile",
    "Version=1.0.0",
    "FORMAT=application%2Fvnd.mapbox-vector-tile",
    "TileMatrix={z}",
    "TileCol={x}",
    "TileRow={y}",
  ];
  return `?${params.join("&")}`;
}

// gets date from 3 weeks ago
const getStartingDate = () => {
  const dateOffset = 24 * 60 * 60 * 1000 * 21;
  const myDate = new Date();
  myDate.setTime(myDate.getTime() - dateOffset);
  return myDate.toISOString();
};

export const startingDate = getStartingDate();
