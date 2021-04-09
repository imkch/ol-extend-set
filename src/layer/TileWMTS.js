import Tile from 'ol/layer/Tile';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

export default class TileWMTS extends Tile {
  constructor(options) {
    const source = options.source;
    source && delete options.source;
    super(options);
    this.capableLoadFunction = options.capableLoadFunction || this.capableLoadFunction_;
    if (source) {
      this.fetchCapabilities_(source);
    } else {
      console.error('source is required');
    }
  }
  capableLoadFunction_(url, parser) {
    return fetch(url)
      .then(response => response.text())
      .then(data => {
        parser(data);
      });
  }
  fetchCapabilities_(source) {
    const urls = source.getUrls();
    if (!urls || urls.length < 1) {
      console.error('url is required');
      return;
    }
    this.layer_ = source.getLayer();
    this.matrixSet_ = source.getMatrixSet();
    this.style_ = source.getStyle();
    const url = `${urls[0]}${urls[0].indexOf('?') > -1 ? '&' : '?'}request=GetCapabilities&service=wmts`;
    this.capableLoadFunction(url, this.parserCapabilities_.bind(this));
  }
  parserCapabilities_(text) {
    const parser = new WMTSCapabilities();
    const result = parser.read(text);
    const layers = result.Contents.Layer;
    let layerNode = layers[0];
    if (!this.layer_) {
      this.layer_ = layerNode.Identifier;
    }
    layers.forEach(item => {
      if (item.Identifier === this.layer_) {
        layerNode = item;
      }
    });
    if (!this.matrixSet_) {
      if (layerNode.Identifier === this.layer_) {
        this.matrixSet_ = layerNode.TileMatrixSetLink[0].TileMatrixSet;
      }
    }
    if (!this.style_) {
      if (layerNode.Identifier === this.layer_) {
        this.style_ = layerNode.Style[0].Identifier;
      }
    }
    const options = optionsFromCapabilities(result, {
      layer: this.layer_,
      matrixSet: this.matrixSet_,
      style: this.style_
    });
    this.setSource(new WMTS(options));
  }
}