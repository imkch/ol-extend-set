import { unByKey } from 'ol/Observable';

import './swipe.css';

export default class Swipe {
  constructor(map, options = {}) {
    if (!map) {
      console.error("map is required");
      return;
    }
    this.map_ = map;
    this.layers_ = options.layers || [];
    this.position_ = options.position || 0.5; // [0,1]
    this.direction_ = options.direction || 'vertical'; // vertical|horizontal
    this.active_ = false;
    this.listeners_ = [];
  }
  render() {
    this.reset();
    this.createSlider_();
    this.active_ = true;
    this.listeners_ = [];
    this.layers_.forEach(layer => {
      const preListener = layer.on('prerender', this.handlePreRender_.bind(this));
      this.listeners_.push(preListener);
      const postListener = layer.on('postrender', this.handlePostRender_.bind(this));
      this.listeners_.push(postListener);
    });
    this.map_.renderSync();
  }
  reset() {
    this.removeSlider_();
    this.active_ = false;
    this.listeners_.forEach(listener => {
      unByKey(listener);
    });
    this.listeners_ = [];
    this.map_.renderSync();
  }
  getActive() {
    return this.active_;
  }
  setLayers(layers) {
    this.layers_ = layers || [];
    this.render();
  }
  setDirection(direction) {
    this.direction_ = direction;
    this.render();
    // this.removeSlider_();
    // this.createSlider_();
  }
  getDirection() {
    return this.direction_;
  }
  setPosition(position) {
    this.position_ = position;
    this.render();
  }
  getPosition() {
    return this.position_;
  }
  createSlider_() {
    if (this.sliderElem_) return;
    const sliderElem = document.createElement('div');
    if (this.direction_ === 'horizontal') {
      sliderElem.className = `oles-swipe-slider horizontal`;
      const mapWidth = this.map_.getSize()[0];
      sliderElem.style.left = this.position_ * mapWidth + 'px';
    } else {
      sliderElem.className = `oles-swipe-slider vertical`;
      const mapHeight = this.map_.getSize()[1];
      sliderElem.style.top = this.position_ * mapHeight + 'px';
    }
    
    sliderElem.addEventListener("mousedown", this.handleMouseDown_.bind(this));
    sliderElem.addEventListener("mouseup", this.handleMouseUp_.bind(this));
    document.body.addEventListener("mouseleave", this.handleMouseLeave_.bind(this));
    document.body.addEventListener("mousemove", this.handleMouseMove_.bind(this));
    this.sliderElem_ = sliderElem;
    const mapElem = this.map_.getTargetElement();
    mapElem.style.position = 'relative';
    mapElem.appendChild(sliderElem);
  }
  removeSlider_() {
    if (!this.sliderElem_) return;
    const mapElem = this.map_.getTargetElement();
    mapElem.style = undefined;
    mapElem.removeChild(this.sliderElem_);
    this.sliderElem_ = undefined;
  }
  handlePreRender_(e) {
    const context = e.context;
    const size = e.frameState.size;
    context.save();
    context.beginPath();
    const pts = [
      [0, 0],
      [size[0], size[1]]
    ];
    if (this.direction_ === 'horizontal') {
      pts[1] = [size[0] * this.position_, size[1]];
    } else {
      pts[1] = [size[0], size[1] * this.position_];
    }
    this.drawRect_(e, pts);
    context.clip();
  }
  handlePostRender_(e) {
    const context = e.context;
    context.restore();
  }
  drawRect_(e, pts) {
    const context = e.context;
    const transform = e.inversePixelTransform;
    if (transform) {
      const matrix = [
        [pts[0][0], pts[0][1]],
        [pts[0][0], pts[1][1]],
        [pts[1][0], pts[1][1]],
        [pts[1][0], pts[0][1]],
        [pts[0][0], pts[0][1]]
      ];
      matrix.forEach((pt, index) => {
        pt = [
          pt[0] * transform[0] - pt[1] * transform[1] + transform[4],
          -pt[0] * transform[2] + pt[1] * transform[3] + transform[5]
        ];
        if (!index) {
          context.moveTo(pt[0], pt[1]);
        } else {
          context.lineTo(pt[0], pt[1]);
        }
      });
    } else {
      context.rect(pts[0][0], pts[0][1], pts[1][0], pts[1][1]);
    }
  }
  handleMouseDown_(e) {
    this.mouseActive_ = true;
  }
  handleMouseUp_(e) {
    this.mouseActive_ = false;
  }
  handleMouseLeave_(e) {
    this.mouseActive_ = false;
  }
  handleMouseMove_(e) {
    if (!this.mouseActive_) return;
    if (this.direction_ === 'horizontal') {
      let clientX = e.clientX;
      const offsetLeft = clientX - this.map_
        .getTargetElement()
        .getBoundingClientRect().left;
      this.sliderElem_.style.left = offsetLeft + 'px';
      const mapWidth = this.map_.getSize()[0];
      this.position_ = offsetLeft / mapWidth;
    } else {
      let clientY = e.clientY;
      const offsetTop = clientY - this.map_
        .getTargetElement()
        .getBoundingClientRect().top;
      this.sliderElem_.style.top = offsetTop + 'px';
      const mapHeight = this.map_.getSize()[1];
      this.position_ = offsetTop / mapHeight;
    }
    this.map_.renderSync();
  }
};
