import VectorTile from 'ol/source/VectorTile';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    if (options.url === undefined) {
      console.error("options.url is required");
    }
    const baseUrl = options.url;
    options.url = baseUrl + '/tile/{z}/{y}/{x}.pbf';
    super(options);
    this.baseUrl = baseUrl;
  }
}