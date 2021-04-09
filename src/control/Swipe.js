import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import SwipeTool from '../tool/Swipe';

import horizontalSvg from '../icon/swipe-horizontal.svg';
import verticalSvg from '../icon/swipe-vertical.svg';
export default class Swipe extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    this.layers_ = options.layers || [];
    const direction = options.direction || 'row';
    
    const horizontalIcon = options.horizontalIcon ? (typeof options.horizontalIcon === 'string' ? this.createIcon_(options.horizontalIcon) : options.horizontalIcon) : this.createIcon_(horizontalSvg);
    const horizontalLabel = options.horizontalLabel !== undefined ? options.horizontalLabel : '卷帘横向对比';
    const verticalIcon = options.verticalIcon ? (typeof options.verticalIcon === 'string' ? this.createIcon_(options.verticalIcon) : options.verticalIcon) : this.createIcon_(verticalSvg);
    const verticalLabel = options.verticalLabel !== undefined ? options.verticalLabel : '卷帘纵向对比';

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-flex oles-${direction} oles-swipe`;
    this.element.className = cssClasses;

    this.createButton_(horizontalIcon, horizontalLabel, this.element, 'horizontal');
    const divider = document.createElement('div');
    divider.className = `oles-divider-${direction.indexOf('row') > -1 ? 'vertical' : 'horizontal'}`;
    this.element.appendChild(divider);
    this.createButton_(verticalIcon, verticalLabel, this.element, 'vertical');
  }
  createButton_(icon, label, element, type) {
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this, type),
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
