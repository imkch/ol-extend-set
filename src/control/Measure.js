import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';

import MeasureInteraction from '../interaction/Measure';

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

    const className = options.className !== undefined ? options.className : 'ol-measure';
    const cssClasses =
      className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
    const element = this.element;
    element.className = cssClasses;

    this.createButton_(areaLabel, areaTipLabel, element, 'area');
    this.createButton_(lengthLabel, lengthTipLabel, element, 'length');
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
    this.measure_(type);
  }
  measure_(type) {
    const map = this.getMap();
    let measureInteraction = map
      .getInteractions()
      .getArray()
      .find(interaction => {
        return interaction instanceof MeasureInteraction;
      });
    if (!measureInteraction) {
      measureInteraction = new MeasureInteraction();
      map.addInteraction(measureInteraction);
    }
    measureInteraction.excute(type);
  }
}