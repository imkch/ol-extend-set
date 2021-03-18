import VectorTile from 'ol/source/VectorTile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    if (options.url === undefined) {
      console.error("options.url is required");
    }
    const baseUrl = options.url;
    options.url = baseUrl + '/tiles/{z}/{x}/{y}.mvt';
    super(options);
    this.baseUrl_ = baseUrl;
  }
  getBaseUrl() {
    return this.baseUrl_;
  }
}
