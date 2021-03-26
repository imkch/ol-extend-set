import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import FilterTool from '../tool/Filter';

export default class Filter extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    this.layers_ = options.layers;

    const label = options.label !== undefined ? options.label : 'F';
    const tipLabel = options.tipLabel !== undefined ? options.tipLabel : '滤镜';
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

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-filter`;
    this.element.className = cssClasses;
    this.element.appendChild(button);
  }
  handleClick_(event) {
    event.preventDefault();
    this.mapFilter_();
  }
  mapFilter_() {
    if(!this.filterTool) {
      const layers = this.layers_ || this.getMap().getLayers().getArray();
      this.filterTool = new FilterTool({layers});
    }
    if(!this.filterTool.getActive()) {
      this.filterTool.render();
    } else {
      this.filterTool.reset();
    }
  }
};
