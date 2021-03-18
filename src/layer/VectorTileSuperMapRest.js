import VectorTileLayer from 'ol/layer/VectorTile';
import { loadVectorTileStyle } from '../style/vector-tile';

export default class VectorTileArcGISRest extends VectorTileLayer {
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
    const styleUrl = source.getBaseUrl() + '/style.json';
    const spriteUrl = source.getBaseUrl() + '/sprites/sprite';
    loadVectorTileStyle(this, styleUrl, spriteUrl, this.credentials_, this.headers_, this.defaultVisible_);
  }
}