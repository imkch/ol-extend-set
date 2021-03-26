import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';

import MeasureTool from '../tool/Measure';

export default class Measure extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    const areaLabel = options.label !== undefined ? options.label : 'A';
    const areaTipLabel = options.tipLabel !== undefined ? options.tipLabel : '测量面积';
    const lengthLabel = options.label !== undefined ? options.label : 'L';
    const lengthTipLabel = options.tipLabel !== undefined ? options.tipLabel : '测量长度';

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-flex oles-measure`;
    this.element.className = cssClasses;

    this.createButton_(areaLabel, areaTipLabel, this.element, 'area');
    const divider = document.createElement('div');
    divider.className = 'oles-button-divider';
    this.element.appendChild(divider);
    this.createButton_(lengthLabel, lengthTipLabel, this.element, 'length');
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
    this.measure_(type);
  }
  measure_(type) {
    const map = this.getMap();
    if (!this.measureTool) {
      this.measureTool = new MeasureTool(map);
    }
    this.measureTool.excute(type);
  }
}