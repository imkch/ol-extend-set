import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';

import FilterInteraction from '../interaction/Filter';

export default class Filter extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    this.layers_ = options.layers || [];
    
    const className = options.className !== undefined ? options.className : 'ol-filter';

    const label = options.label !== undefined ? options.label : 'F';
    const tipLabel = options.tipLabel !== undefined ? options.tipLabel : '滤镜';
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
    this.filter_();
  }
  filter_() {
    const map = this.getMap();
    let filterInteraction = map
      .getInteractions()
      .getArray()
      .find(interaction => interaction instanceof FilterInteraction);
    if(!filterInteraction) {
      filterInteraction = new FilterInteraction({layers: this.layers_});
      map.addInteraction(filterInteraction);
    }
    if(!filterInteraction.getState()) {
      filterInteraction.render();
    } else {
      filterInteraction.reset();
    }
  }
};
