import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';

export default class XYZArcGISRest extends XYZ {
  constructor(options) {
    const baseUrl = options.url;
    options.url = `${baseUrl}/tile/{z}/{y}/{x}`;
    super(options);
    this.baseUrl_ = baseUrl;
    this.credentials_ = options.withCredentials ? 'include' : 'omit';
    this.headers_ = options.headers || {};
    this.setTileGrid_();
  }
  setTileGrid_() {
    const url = `${this.baseUrl}?f=pjson`;
    fetch(url, { headers: this.headers_, credentials: this.credentials_ })
      .then(response => response.json())
      .then(data => {
        const { tileInfo, fullExtent } = data;
        const origin = [tileInfo.origin.x, tileInfo.origin.y];
        const resolutions = tileInfo.lods.map(item => {
          return item.resolution;
        });
        const extent = [
          fullExtent.xmin,
          fullExtent.ymin,
          fullExtent.xmax,
          fullExtent.ymax
        ];
        const tileGrid = new TileGrid({
          tileSize: tileInfo.rows,
          origin,
          resolutions,
          extent
        });
        this.tileGrid = tileGrid;
      });
  }
}