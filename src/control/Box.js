import Control from 'ol/control/Control';
import { CLASS_UNSELECTABLE } from 'ol/css';

import './box.css';

export default class Container extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    this.element.className = `oles-box`;
  }
  appendChild(control) {
    control.setTarget(this.element);
    const map = this.getMap();
    map.addControl(control);
  }
}