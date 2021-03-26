import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import SwipeTool from '../tool/Swipe';

export default class Swipe extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    this.layers_ = options.layers || [];
    
    const horizontalLabel = options.horizontalLabel !== undefined ? options.horizontalLabel : 'H';
    const horizontalTipLabel = options.horizontalTipLabel !== undefined ? options.horizontalTipLabel : '横向卷帘对比';
    const verticalLabel = options.verticalLabel !== undefined ? options.verticalLabel : 'V';
    const verticalTipLabel = options.verticalTipLabel !== undefined ? options.verticalTipLabel : '竖向卷帘对比';

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-flex oles-swipe`;
    this.element.className = cssClasses;

    this.createButton_(horizontalLabel, horizontalTipLabel, this.element, 'horizontal');
    const divider = document.createElement('div');
    divider.className = 'oles-button-divider';
    this.element.appendChild(divider);
    this.createButton_(verticalLabel, verticalTipLabel, this.element, 'vertical');
  }
  createButton_(label, tipLabel, element, type) {
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = tipLabel;
    button.appendChild(
      typeof label === 'string' ? document.createTextNode(label) : label
    );

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this, type),
      false
    );
    element.appendChild(button);
  }
  handleClick_(type, event) {
    event.preventDefault();
    this.swipe_(type);
  }
  swipe_(type) {
    const map = this.getMap();
    if(!this.swipeTool) {
      this.swipeTool = new SwipeTool(map, {layers: this.layers_, direction: type});
    }
    const direction = this.swipeTool.getDirection();
    direction !== type &&  this.swipeTool.setDirection(type);
    if(!this.swipeTool.getActive()) {
      this.swipeTool.render();
    } else {
      direction === type && this.swipeTool.reset();
    }
  }
};
