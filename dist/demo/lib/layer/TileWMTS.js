(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Tile'), require('ol/source/WMTS'), require('ol/format/WMTSCapabilities')) :
  typeof define === 'function' && define.amd ? define(['ol/layer/Tile', 'ol/source/WMTS', 'ol/format/WMTSCapabilities'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TileWMTS = factory(global.TileLayer, global.WMTSSource, global.WMTSCapabilities));
}(this, (function (TileLayer, WMTSSource, WMTSCapabilities) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var TileLayer__default = /*#__PURE__*/_interopDefaultLegacy(TileLayer);
  var WMTSSource__default = /*#__PURE__*/_interopDefaultLegacy(WMTSSource);
  var WMTSCapabilities__default = /*#__PURE__*/_interopDefaultLegacy(WMTSCapabilities);

  class TileWMTS extends TileLayer__default['default'] {
    constructor(options) {
      const source = options.source;
      source && delete options.source;
      super(options);
      source && this.setSourceFunction(source);
    }

    setSourceFunction(source) {
      const urls = source.getUrls();

      if (!urls || urls.length < 1) {
        console.error("url is required");
        return;
      }

      let layer = source.getLayer();
      let matrixSet = source.getMatrixSet();
      let style = source.getStyle();
      const url = `${urls[0]}${urls[0].indexOf('?') > -1 ? '&' : '?'}request=GetCapabilities&service=wmts`;
      fetch(url).then(response => response.text()).then(text => {
        const parser = new WMTSCapabilities__default['default']();
        const result = parser.read(text);
        const layers = result.Contents.Layer;
        let layerNode = layers[0];

        if (!layer) {
          layer = layerNode.Identifier;
        }

        layers.forEach(item => {
          if (item.Identifier === layer) {
            layerNode = item;
          }
        });

        if (!matrixSet) {
          if (layerNode.Identifier === layer) {
            matrixSet = layerNode.TileMatrixSetLink[0].TileMatrixSet;
          }
        }

        if (!style) {
          if (layerNode.Identifier === layer) {
            style = layerNode.Style[0].Identifier;
          }
        }

        const options = WMTSSource.optionsFromCapabilities(result, {
          layer,
          matrixSet,
          style,
          urls
        });
        this.setSource(new WMTSSource__default['default'](options));
      });
    }

  }

  return TileWMTS;

})));
