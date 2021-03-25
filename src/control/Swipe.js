import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';

import SwipeInteraction from '../interaction/Swipe';

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

    const className = options.className !== undefined ? options.className : 'ol-swipe';
    const cssClasses =
      className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
    const element = this.element;
    element.className = cssClasses;

    this.createButton_(horizontalLabel, horizontalTipLabel, element, 'horizontal');
    this.createButton_(verticalLabel, verticalTipLabel, element, 'vertical');
  }
  createButton_(label, tipLabel, element, type) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
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
    let swipeInteraction = map
      .getInteractions()
      .getArray()
      .find(interaction => interaction instanceof SwipeInteraction);
    if(!swipeInteraction) {
      swipeInteraction = new SwipeInteraction({layers: this.layers_, direction: type});
      map.addInteraction(swipeInteraction);
    }
    if(!swipeInteraction.getState()) {
      swipeInteraction.render();
    } else {
      swipeInteraction.reset();
    }
  }
};
