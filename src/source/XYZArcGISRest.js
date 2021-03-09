import XYZSource from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';

export default class XYZArcGISRest extends XYZSource {
  constructor(options) {
    const baseUrl = options.url;
    options.url = `${baseUrl}/tile/{z}/{y}/{x}`;
    super(options);
    this.setTileGridFunction(baseUrl);
  }
  setTileGridFunction(baseUrl) {
    const url = `${baseUrl}?f=pjson`;
    fetch(url)
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