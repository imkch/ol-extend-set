import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import FilterTool from '../tool/Filter';

import filterSvg from '../icon/filter.svg';
export default class Filter extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    this.layers_ = options.layers;

    const icon = options.icon ? (typeof options.icon === 'string' ? this.createIcon_(options.icon) : options.icon) : this.createIcon_(filterSvg);
    const label = options.label !== undefined ? options.label : '滤镜';
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false
    );

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-filter`;
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
