import VectorTile from 'ol/layer/VectorTile';
import { loadVectorTileStyle } from '../style/VectorTile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    const visible = typeof(options.visible) === 'undefined' ? true : options.visible;
    options.visible = false;
    super(options);
    this.visible = visible;
    this.source = options.source;
    this.credentials = options.withCredentials ? 'include' : 'omit';
    this.headers = options.headers || {};
    this.styleLoadFunction();
  }
  styleLoadFunction() {
    const styleUrl = this.source.baseUrl + '/style.json';
    const spriteUrl = this.source.baseUrl + '/sprites/sprite';
    loadVectorTileStyle(this, styleUrl, spriteUrl);
  }
}