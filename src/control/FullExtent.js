import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import fullExtentSvg from '../icon/full-extent.svg';
export default class FullExtent extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    this.extent_ = options.extent;

    const icon = options.icon ? (typeof options.icon === 'string' ? this.createIcon_(options.icon) : options.icon) : this.createIcon_(fullExtentSvg);
    const label = options.label !== undefined ? options.label : '全图';
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false
    );

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-full-extent`;
    this.element.className = cssClasses;
    this.element.appendChild(button);
  }
  createIcon_(source) {
    const icon = document.createElement('img');
    icon.src = source;
    icon.className = 'oles-icon';
    return icon;
  }
  handleClick_(event) {
    event.preventDefault();
    this.fullExtent_();
  }
  fullExtent_() {
    const map = this.getMap();
    const mapView = map.getView();
    const extent = !this.extent_
      ? mapView.getProjection().getExtent()
      : this.extent_;
    mapView.fit(extent, { duration: 500 });
  }
};
