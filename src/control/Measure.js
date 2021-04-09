import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import MeasureTool from '../tool/Measure';

import measureAreaSvg from '../icon/measure-area.svg';
import measureLengthSvg from '../icon/measure-length.svg';

export default class Measure extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    const direction = options.direction || 'row';

    const areaIcon = options.areaIcon ? (typeof options.areaIcon === 'string' ? this.createIcon_(options.areaIcon) : options.areaIcon) : this.createIcon_(measureAreaSvg);
    const areaLabel = options.areaLabel !== undefined ? options.areaLabel : '测量面积';
    const lengthIcon = options.lengthIcon ? (typeof options.lengthIcon === 'string' ? this.createIcon_(options.lengthIcon) : options.lengthIcon) : this.createIcon_(measureLengthSvg);
    const lengthLabel = options.lengthLabel !== undefined ? options.lengthLabel : '测量长度';

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-flex oles-${direction} oles-measure`;
    this.element.className = cssClasses;

    this.createButton_(areaIcon, areaLabel, this.element, 'area');
    const divider = document.createElement('div');
    divider.className = `oles-divider-${direction.indexOf('row') > -1 ? 'vertical' : 'horizontal'}`;
    this.element.appendChild(divider);
    this.createButton_(lengthIcon, lengthLabel, this.element, 'length');
  }
  createButton_(icon, label, element, mode) {
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this, mode),
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
  handleClick_(mode, event) {
    event.preventDefault();
    this.measure_(mode);
  }
  measure_(mode) {
    const map = this.getMap();
    if (!this.measureTool) {
      this.measureTool = new MeasureTool(map);
    }
    if (this.measureTool.getActive()) {
      if (this.measureTool.getMode() === mode) {
        this.measureTool.stop();
      } else {
        this.measureTool.excute(mode);
      }
    } else {
      this.measureTool.excute(mode);
    }
  }
}