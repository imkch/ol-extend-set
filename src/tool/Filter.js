import { unByKey } from 'ol/Observable';

export const FilterMode = {
  GRAY: 'gray'
};

export default class Filter {
  constructor(options = {}) {
    this.layers_ = options.layers || [];
    this.mode_ = options.mode || FilterMode.GRAY;
    this.active_ = false;
  }
  render() {
    this.active_ = true;
    this.layers_.forEach(layer => {
      const context = layer.getRenderer().context;
      this.filter_(context);
      const listener_ = layer.on('postrender', this.handlePostRender_.bind(this));
      layer.listener_ = listener_;
    });
  }
  reset() {
    this.active_ = false;
    this.layers_.forEach(layer => {
      unByKey(layer.listener_);
      layer.setOpacity(layer.getOpacity() === 1 ? 0.99 : 1); // TODO：使地图刷新
    });
  }
  getActive() {
    return this.active_;
  }
  getMode() {
    return this.mode_;
  }
  setLayers(layers) {
    this.layers_ = layers || [];
    this.render();
  }
  setMode(mode) {
    this.mode_ = mode || FilterMode.GRAY;
    this.render();
  }
  handlePostRender_(e) {
    const context = e.context;
    this.filter_(context);
  }
  filter_(context) {
    const w = context.canvas.width;
    const h = context.canvas.height;
    let imageData = context.getImageData(0, 0, w, h);
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        let idx = (x + y * imageData.width) * 4;
        let r = imageData.data[idx + 0];
        let g = imageData.data[idx + 1];
        let b = imageData.data[idx + 2];
        let gray = 0.299 * r + 0.587 * g + 0.114 * b;
        imageData.data[idx + 0] = gray;
        imageData.data[idx + 1] = gray;
        imageData.data[idx + 2] = gray;
      }
    }
    context.putImageData(imageData, 0, 0);
  }
};
