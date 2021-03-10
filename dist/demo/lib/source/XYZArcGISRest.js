(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/source/XYZ'), require('ol/tilegrid/TileGrid')) :
  typeof define === 'function' && define.amd ? define(['ol/source/XYZ', 'ol/tilegrid/TileGrid'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.XYZArcGISRest = factory(global.XYZSource, global.TileGrid));
}(this, (function (XYZSource, TileGrid) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var XYZSource__default = /*#__PURE__*/_interopDefaultLegacy(XYZSource);
  var TileGrid__default = /*#__PURE__*/_interopDefaultLegacy(TileGrid);

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

  return XYZArcGISRest;

})));
