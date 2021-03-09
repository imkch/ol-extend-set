import TileLayer from 'ol/layer/Tile';
import WMTSSource, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

export default class WMTS extends TileLayer {
  constructor(options) {
    const source = options.source;
    source && delete options.source
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
    fetch(url)
      .then(response => response.text())
      .then(text => {
        const parser = new WMTSCapabilities();
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
        const options = optionsFromCapabilities(result, { layer, matrixSet, style, urls });
        console.log(options);
        this.setSource(new WMTSSource(options));
      });
  }
}