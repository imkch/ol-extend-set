(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/source/WMTS'), require('ol/tilegrid/WMTS')) :
  typeof define === 'function' && define.amd ? define(['ol/source/WMTS', 'ol/tilegrid/WMTS'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.WMTSTDT = factory(global.WMTSSource, global.WMTSTileGrid));
}(this, (function (WMTSSource, WMTSTileGrid) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var WMTSSource__default = /*#__PURE__*/_interopDefaultLegacy(WMTSSource);
  var WMTSTileGrid__default = /*#__PURE__*/_interopDefaultLegacy(WMTSTileGrid);

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

  return WMTSTDT;

})));
