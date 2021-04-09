import Control from 'ol/control/Control';

import './container.css';

export default class Container extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    const position = options.position || 'top-left';
    const direction = options.direction || 'row';

    this.element.className = `oles-container oles-${position} oles-${direction}`;
  }
  appendChild(control) {
    control.setTarget(this.element);
    const map = this.getMap();
    map.addControl(control);
  }
}
