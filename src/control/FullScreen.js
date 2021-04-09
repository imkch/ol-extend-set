import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import FullScreenTool from '../tool/FullScreen';

import fullScreenSvg from '../icon/full-screen.svg';
export default class FullScreen extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    const icon = options.icon ? (typeof options.icon === 'string' ? this.createIcon_(options.icon) : options.icon) : this.createIcon_(fullScreenSvg);
    const label = options.label !== undefined ? options.label : '全屏';
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false
    );

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-full-screen`;
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
