import Control from 'ol/control/Control';

import './box.css';

export default class Container extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    this.element.className = `oles-box`;
  }
  appendChild(control) {
    control.setTarget(this.element);
    const map = this.getMap();
    map.addControl(control);
  }
}