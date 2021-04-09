import VectorTile from 'ol/layer/VectorTile';
import { loadVectorTileStyle } from '../style/vector-tile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    const visible = typeof(options.visible) === 'undefined' ? true : options.visible;
    options.visible = false;
    super(options);
    this.styleLoadFunction = options.styleLoadFunction || this.styleLoadFunction_;
    this.defaultVisible_ = visible;
    const source = this.getSource();
    if (source) {
      this.loadStyle_(source);
    } else {
      console.error('source is required');
    }
  }
  styleLoadFunction_(url, load) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        load(data);
      });
  }
  loadStyle_(source) {
    const styleUrl = source.getBaseUrl() + '/resources/styles';
    const spriteUrl = source.getBaseUrl() + '/resources/sprites/sprite';
    const layers = source.getLayers();
    loadVectorTileStyle(this, styleUrl, spriteUrl, this.defaultVisible_, layers ,this.styleLoadFunction);
  }
}