import VectorTile from 'ol/layer/VectorTile';
import { loadVectorTileStyle } from '../style/vector-tile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    const visible = typeof(options.visible) === 'undefined' ? true : options.visible;
    options.visible = false;
    super(options);
    const credentials = options.withCredentials ? 'include' : 'omit';
    const headers = options.headers || {};
    this.styleLoadFunction(credentials, headers, visible);
  }
  styleLoadFunction(credentials, headers, visible) {
    const source = this.getSource();
    const styleUrl = source.baseUrl + '/resources/styles';
    const spriteUrl = source.baseUrl + '/resources/sprites/sprite';
    loadVectorTileStyle(this, styleUrl, spriteUrl, credentials, headers, visible);
  }
}