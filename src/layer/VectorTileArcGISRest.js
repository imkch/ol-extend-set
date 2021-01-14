import VectorTile from 'ol/layer/VectorTile';
import stylefunction from 'ol-mapbox-style/src/stylefunction';

export default class VectorTileArcGISRest extends VectorTile {
  constructor(options) {
    const visible = typeof(options.visible) === 'undefined' ? true : options.visible;
    options.visible = false;
    super(options);
    this.visible = visible;
    this.source = options.source;
    this.credentials = options.withCredentials ? 'include' : 'omit';
    this.headers = options.headers || {};
    this._styleLoadFunction();
  }
  _styleLoadFunction() {
    const { source, credentials, headers } = this;
    const styleUrl = `${source.baseUrl}/resources/styles`;
    fetch(styleUrl, { headers, credentials })
      .then(response => response.json())
      .then(data => {
        this._loadStyle(data);
      })
      .catch(e => {
        console.error('load style error', e);
      })
  }
  _loadStyle(styleJson) {
    const { source, credentials, headers } = this;
    const spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
    const sizeFactor = spriteScale === 0.5 ? '@2x' : '';
    const sourceName = Object.keys(styleJson.sources)[0];
    const tileGrid = source.getTileGrid();
    const resolutions = tileGrid.getResolutions();
    const spriteImageUrl = source.baseUrl + '/resources/sprites/sprite' + sizeFactor + '.png';
    const style = this._getStyle(styleJson, sourceName, resolutions, null, spriteImageUrl);
    this.setStyle(style);
    
    const spriteUrl = source.baseUrl + '/resources/sprites/sprite' + sizeFactor + '.json';
    fetch(spriteUrl, { headers, credentials })
      .then(response => response.json())
      .then(data => {
        const style = this._getStyle(styleJson, sourceName, resolutions, data, spriteImageUrl);
        this.setStyle(style);
        this.setVisible(this.visible);
      })
      .catch(e => {
        console.error('load sprite error', e);
      })
  }
  _getStyle(styleJson, sourceName, resolutions, sprite, spriteImageUrl) {
    const fun = stylefunction(
      this,
      styleJson,
      sourceName,
      resolutions,
      sprite,
      spriteImageUrl,
      () => []
    );
    return (feature, resolution) => {
      return fun(feature, resolution);
    };
  }
}