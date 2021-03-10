(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/source/VectorTile'), require('ol/source/WMTS'), require('ol/tilegrid/WMTS'), require('ol/source/XYZ'), require('ol/tilegrid/TileGrid')) :
  typeof define === 'function' && define.amd ? define(['ol/source/VectorTile', 'ol/source/WMTS', 'ol/tilegrid/WMTS', 'ol/source/XYZ', 'ol/tilegrid/TileGrid'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.VectorTile, global.WMTSSource, global.WMTSTileGrid, global.XYZSource, global.TileGrid));
}(this, (function (VectorTile, WMTSSource, WMTSTileGrid, XYZSource, TileGrid) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var VectorTile__default = /*#__PURE__*/_interopDefaultLegacy(VectorTile);
  var WMTSSource__default = /*#__PURE__*/_interopDefaultLegacy(WMTSSource);
  var WMTSTileGrid__default = /*#__PURE__*/_interopDefaultLegacy(WMTSTileGrid);
  var XYZSource__default = /*#__PURE__*/_interopDefaultLegacy(XYZSource);
  var TileGrid__default = /*#__PURE__*/_interopDefaultLegacy(TileGrid);

  class VectorTileArcGISRest extends VectorTile__default['default'] {
    constructor(options) {
      if (options.url === undefined) {
        console.error("options.url is required");
      }

      const baseUrl = options.url;
      options.url = baseUrl + '/tile/{z}/{y}/{x}.pbf';
      super(options);
      this.baseUrl = baseUrl;
    }

  }

  class VectorTileArcGISRest$1 extends VectorTile__default['default'] {
    constructor(options) {
      if (options.url === undefined) {
        console.error("options.url is required");
      }

      const baseUrl = options.url;
      options.url = baseUrl + '/tiles/{z}/{x}/{y}.mvt';
      super(options);
      this.baseUrl = baseUrl;
    }

  }

  const default4326TileGrid = function () {
    const resolutions = [];
    const matrixIds = [];

    for (let i = 1; i < 19; i++) {
      resolutions.push(0.703125 * 2 / Math.pow(2, i));
      matrixIds.push(i);
    }

    const tileGird = new WMTSTileGrid__default['default']({
      extent: [-180, -90, 180, 90],
      resolutions,
      origin: [-180, 90],
      matrixIds: matrixIds,
      minZoom: 1
    });
    return tileGird;
  };

  const default3857TileGrid = function () {
    const resolutions = [];
    const matrixIds = [];

    for (let i = 1; i < 19; i++) {
      resolutions.push(78271.5169640203125 * 2 / Math.pow(2, i));
      matrixIds.push(i);
    }

    const tileGird = new WMTSTileGrid__default['default']({
      extent: [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
      resolutions,
      matrixIds: matrixIds,
      origin: [-20037508.3427892, 20037508.3427892],
      minZoom: 1
    });
    return tileGird;
  };

  class WMTSTDT extends WMTSSource__default['default'] {
    constructor(options) {
      const matrixSet = options.matrixSet || 'c';
      const layer = options.layer || 'vec';
      const defaultOptions = {
        tileGrid: matrixSet === 'c' ? default4326TileGrid() : default3857TileGrid(),
        style: 'default',
        format: 'tiles',
        layer,
        matrixSet,
        url: `http://t{0-7}.tianditu.gov.cn/${layer}_${matrixSet}/wmts?tk=${options.tk}`
      };
      super(Object.assign(defaultOptions, options));
    }

  }

  class XYZArcGISRest extends XYZSource__default['default'] {
    constructor(options) {
      const baseUrl = options.url;
      options.url = `${baseUrl}/tile/{z}/{y}/{x}`;
      super(options);
      this.setTileGridFunction(baseUrl);
    }

    setTileGridFunction(baseUrl) {
      const url = `${baseUrl}?f=pjson`;
      fetch(url).then(response => response.json()).then(data => {
        const {
          tileInfo,
          fullExtent
        } = data;
        const origin = [tileInfo.origin.x, tileInfo.origin.y];
        const resolutions = tileInfo.lods.map(item => {
          return item.resolution;
        });
        const extent = [fullExtent.xmin, fullExtent.ymin, fullExtent.xmax, fullExtent.ymax];
        const tileGrid = new TileGrid__default['default']({
          tileSize: tileInfo.rows,
          origin,
          resolutions,
          extent
        });
        this.tileGrid = tileGrid;
      });
    }

  }

  var index = {
    VectorTileArcGISRest,
    VectorTileSuperMapRest: VectorTileArcGISRest$1,
    WMTSTDT,
    XYZArcGISRest
  };

  return index;

})));
