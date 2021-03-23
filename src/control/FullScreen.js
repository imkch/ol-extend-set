import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';

import FullScreenInteraction from '../interaction/FullScreen';

export default class FullScreen extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });
    
    const className = options.className !== undefined ? options.className : 'ol-full-screen';

    const label = options.label !== undefined ? options.label : 'F';
    const tipLabel = options.tipLabel !== undefined ? options.tipLabel : '全屏';
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.title = tipLabel;
    button.appendChild(
      typeof label === 'string' ? document.createTextNode(label) : label
    );

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false
    );

    const cssClasses =
      className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
    const element = this.element;
    element.className = cssClasses;
    element.appendChild(button);
  }
  handleClick_(event) {
    event.preventDefault();
    this.fullScreen_();
  }
  fullScreen_() {
    const map = this.getMap();
    let fullScreenInteraction = map
      .getInteractions()
      .getArray()
      .find(interaction => interaction instanceof FullScreenInteraction);
    if(!fullScreenInteraction) {
      fullScreenInteraction = new FullScreenInteraction();
      map.addInteraction(fullScreenInteraction);
    }
    if(fullScreenInteraction.getState()) {
      fullScreenInteraction.exit();
    } else {
      fullScreenInteraction.entry();
    }
  }
};
