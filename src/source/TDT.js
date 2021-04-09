import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

const default4326TileGrid = function() {
  const resolutions = [];
  const matrixIds = [];
  for (let i = 1; i < 19; i++) {
    resolutions.push((0.703125 * 2) / Math.pow(2, i));
    matrixIds.push(i);
  }
  const tileGird = new WMTSTileGrid({
    extent: [-180, -90, 180, 90],
    resolutions,
    origin: [-180, 90],
    matrixIds: matrixIds,
    minZoom: 1
  });
  return tileGird;
};

const default3857TileGrid = function() {
  const resolutions = [];
  const matrixIds = [];
  for (let i = 1; i < 19; i++) {
    resolutions.push((78271.5169640203125 * 2) / Math.pow(2, i));
    matrixIds.push(i);
  }
  const tileGird = new WMTSTileGrid({
    extent: [
      -20037508.3427892,
      -20037508.3427892,
      20037508.3427892,
      20037508.3427892
    ],
    resolutions,
    matrixIds: matrixIds,
    origin: [-20037508.3427892, 20037508.3427892],
    minZoom: 1
  });
  return tileGird;
};

export default class TDT extends WMTS {
  constructor(options) {
    if (!options.token) {
      console.error('token is required');
      return;
    }
    const matrixSet = options.matrixSet || 'c';
    const layer = options.layer || 'vec';
    const defaultOptions = {
      tileGrid: matrixSet === 'c' ? default4326TileGrid() : default3857TileGrid(),
      style: 'default',
      format: 'tiles',
      layer,
      matrixSet,
      url: `http://t{0-7}.tianditu.gov.cn/${layer}_${matrixSet}/wmts?tk=${options.token}`
    };
    super(Object.assign(defaultOptions, options));
  }
}