import TileGrid from 'ol/tilegrid/TileGrid';
export default class ArcGISRest {
  constructor(options = {}) {
    this.source_ = typeof options === 'string' ? JSON.parse(options) : options;
  }
  read() {
    return {
      tileSize: this.readTileSize(),
      origin: this.readOrigin(),
      resolutions: this.readResolutions(),
      extent: this.readExtent()
    };
  }
  readExtent() {
    const { fullExtent } = this.source_;
    return [
      fullExtent.xmin,
      fullExtent.ymin,
      fullExtent.xmax,
      fullExtent.ymax
    ];
  }
  readResolutions() {
    const { tileInfo } = this.source_;
    if (!tileInfo) return;
    return tileInfo.lods.map(item => {
      return item.resolution;
    });
  }
  readOrigin() {
    const { tileInfo } = this.source_;
    if (!tileInfo) return;
    return [tileInfo.origin.x, tileInfo.origin.y];
  }
  readTileSize() {
    const { tileInfo } = this.source_;
    if (!tileInfo) return;
    return [tileInfo.rows, tileInfo.cols];
  }
  readTileGrid() {
    return new TileGrid({
      tileSize: this.readTileSize(),
      origin: this.readOrigin(),
      resolutions: this.readResolutions(),
      extent: this.readExtent()
    });
  }
};