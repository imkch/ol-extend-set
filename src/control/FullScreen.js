import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import FullScreenTool from '../tool/FullScreen';

export default class FullScreen extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    const label = options.label !== undefined ? options.label : 'F';
    const tipLabel = options.tipLabel !== undefined ? options.tipLabel : '全屏';
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = tipLabel;
    button.appendChild(
      typeof label === 'string' ? document.createTextNode(label) : label
    );

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false
    );

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-full-screen`;
    this.element.className = cssClasses;
    this.element.appendChild(button);
  }
  handleClick_(event) {
    event.preventDefault();
    this.fullScreen_();
  }
  fullScreen_() {
    if(!this.fullScreenTool) {
      this.fullScreenTool = new FullScreenTool();
    }
    if(this.fullScreenTool.getActive()) {
      this.fullScreenTool.exit();
    } else {
      this.fullScreenTool.entry();
    }
  }
};
