import TileImage from 'ol/source/TileImage';
import { scale as scaleSize, toSize } from 'ol/size';
import { appendParams } from 'ol/uri';
import { modulo } from 'ol/math';
import { hash as tileCoordHash } from 'ol/tilecoord';
import { resolutionToScale } from '../util/resolution';

function getKeyForParams(params) {
  let i = 0;
  const res = [];
  for (const key in params) {
    res[i++] = key + '-' + params[key];
  }
  return res.join('/');
}

function getRequestUrl(urls, tileCoord, tileSize, dpi, projection, params, tileGrid, format) {
  if (!urls) {
    return undefined;
  }
  const resolution = tileGrid.getResolution(tileCoord[0]);
  const unit = projection.getUnits();
  const scale = resolutionToScale(resolution, dpi, unit);
  const origin = tileGrid.getOrigin(0);
  params['x'] = tileCoord[1];
  params['y'] = tileCoord[2];
  params['width'] = tileSize[0];
  params['height'] = tileSize[1];
  params['scale'] = scale;
  params['origin'] = JSON.stringify({x: origin[0], y: origin[1]});

  let url;
  if (urls.length == 1) {
    url = urls[0];
  } else {
    const index = modulo(tileCoordHash(tileCoord), urls.length);
    url = urls[index];
  }

  const modifiedUrl = url + '/tileImage.' + format;
  return appendParams(modifiedUrl, params);
}

export default class TileSuperMapRest extends TileImage {
  constructor(options) {
    super(options);
    this.hidpi_ = options.hidpi !== undefined ? options.hidpi : false;
    this.format_ = options.format ? options.format : 'png';
    this.params_ = options.params || {};
    this.setKey(getKeyForParams(this.params_));
  }
  tileUrlFunction(tileCoord, pixelRatio, projection) {
    let tileGrid = this.getTileGrid();
    if (!tileGrid) {
      tileGrid = this.getTileGridForProjection(projection);
    }
    if (tileGrid.getResolutions().length <= tileCoord[0]) {
      return undefined;
    }
    pixelRatio = this.hidpi_ ? pixelRatio : 1;
    let tileSize = toSize(tileGrid.getTileSize(tileCoord[0]), this.tmpSize);
    if (pixelRatio != 1) {
      tileSize = scaleSize(tileSize, pixelRatio, this.tmpSize);
    }
    const dpi = Math.round(
      (this.params_['dpi'] ? this.params_['dpi'] : 96) * pixelRatio
    )

    const baseParams = {
      'transparent': true,
      'redirect': false,
      'cacheEnabled': true,
      'overlapDisplayed': false
    };
    Object.assign(baseParams, this.params_);
    return getRequestUrl(this.urls, tileCoord, tileSize, dpi, projection, baseParams, tileGrid, this.format_);
  }
}
