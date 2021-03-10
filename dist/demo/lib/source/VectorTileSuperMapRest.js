(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/source/VectorTile')) :
  typeof define === 'function' && define.amd ? define(['ol/source/VectorTile'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VectorTileSuperMapRest = factory(global.VectorTile));
}(this, (function (VectorTile) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var VectorTile__default = /*#__PURE__*/_interopDefaultLegacy(VectorTile);

  class VectorTileArcGISRest extends VectorTile__default['default'] {
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

  return VectorTileArcGISRest;

})));
