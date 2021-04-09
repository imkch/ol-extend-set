import VectorTile from 'ol/source/VectorTile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    if (options.url === undefined) {
      console.error('url is required');
    }
    const baseUrl = options.url;
    options.url = baseUrl + '/tile/{z}/{y}/{x}.pbf';
    super(options);
    this.baseUrl_ = baseUrl;
    this.layers_ = options.layers;
  }
  getBaseUrl() {
    return this.baseUrl_;
  }
  getLayers() {
    return this.layers_;
  }
}