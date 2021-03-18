import VectorTile from 'ol/layer/VectorTile';
import { loadVectorTileStyle } from '../style/vector-tile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    const visible = typeof(options.visible) === 'undefined' ? true : options.visible;
    options.visible = false;
    super(options);
    this.defaultVisible_ = visible;
    this.credentials_ = options.withCredentials ? 'include' : 'omit';
    this.headers_ = options.headers || {};
    this.loadStyle_();
  }
  loadStyle_() {
    const source = this.getSource();
    const styleUrl = source.getBaseUrl() + '/resources/styles';
    const spriteUrl = source.getBaseUrl() + '/resources/sprites/sprite';
    loadVectorTileStyle(this, styleUrl, spriteUrl, this.credentials_, this.headers_, this.defaultVisible_);
  }
}