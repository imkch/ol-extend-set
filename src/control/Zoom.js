import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import zoomInSvg from '../icon/zoom-in.svg';
import zoomOutSvg from '../icon/zoom-out.svg';
export default class Zoom extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    this.layers_ = options.layers || [];
    const direction = options.direction || 'column';
    
    const zoomInIcon = options.zoomInIcon ? (typeof options.zoomInIcon === 'string' ? this.createIcon_(options.zoomInIcon) : options.zoomInIcon) : this.createIcon_(zoomInSvg);
    const zoomInLabel = options.zoomInLabel !== undefined ? options.zoomInLabel : '放大';
    const zoomOutIcon = options.zoomOutIcon ? (typeof options.zoomOutIcon === 'string' ? this.createIcon_(options.zoomOutIcon) : options.zoomOutIcon) : this.createIcon_(zoomOutSvg);
    const zoomOutLabel = options.zoomOutLabel !== undefined ? options.zoomOutLabel : '缩小';

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-flex oles-${direction} oles-zoom`;
    this.element.className = cssClasses;

    this.createButton_(zoomInIcon, zoomInLabel, this.element, 1);
    const divider = document.createElement('div');
    divider.className = `oles-divider-${direction.indexOf('row') > -1 ? 'vertical' : 'horizontal'}`;
    this.element.appendChild(divider);
    this.createButton_(zoomOutIcon, zoomOutLabel, this.element, -1);
  }
  createButton_(icon, label, element, zoom) {
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this, zoom),
      false
    );
    element.appendChild(button);
  }
  createIcon_(source) {
    const icon = document.createElement('img');
    icon.src = source;
    icon.className = 'oles-icon';
    return icon;
  }
  handleClick_(zoom, event) {
    event.preventDefault();
    this.zoomToMap_(zoom);
  }
  zoomToMap_(zoom) {
    const map = this.getMap();
    const mapView = map.getView();
    if (!mapView) return;
    const currentZoom = mapView.getZoom();
    const minZoom = mapView.getMinZoom();
    const maxZoom = mapView.getMaxZoom();
    if (minZoom < currentZoom < maxZoom) {
      mapView.animate({ zoom: currentZoom + zoom, duration: 500 });
    }
  }
};