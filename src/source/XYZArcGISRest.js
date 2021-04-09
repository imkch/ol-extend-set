import XYZ from 'ol/source/XYZ';
import ArcGISRest from '../format/ArcGISRest';

export default class XYZArcGISRest extends XYZ {
  constructor(options) {
    const baseUrl = options.url;
    options.url = `${baseUrl}/tile/{z}/{y}/{x}`;
    super(options);
    this.tileInfoLoadFuntion = options.tileInfoLoadFuntion || this.tileInfoLoadFuntion_;
    this.baseUrl_ = baseUrl;
    this.fetchTileInfo_();
  }
  tileInfoLoadFuntion_(url, parser) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        parser(data);
      });
  }
  fetchTileInfo_() {
    const url = `${this.baseUrl}?f=pjson`;
    this.tileInfoLoadFuntion(url, this.parserTileGrid_);
  }
  parserTileGrid_() {
    const parser = new ArcGISRest(data);
    this.tileGrid = parser.readTileGrid();
  }
}