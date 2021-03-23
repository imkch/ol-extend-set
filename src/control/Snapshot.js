import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';
import fileSaver from "file-saver";

import SnapshotInteraction from '../interaction/Snapshot';

export default class Snapshot extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });

    const className = options.className !== undefined ? options.className : 'ol-snapshot';

    const label = options.label !== undefined ? options.label : 'S';
    const tipLabel = options.tipLabel !== undefined ? options.tipLabel : '快照';
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
    this.mapToImage_();
  }
  mapToImage_() {
    const map = this.getMap();
    let snapshotInteraction = map
      .getInteractions()
      .getArray()
      .find(interaction => {
        return interaction instanceof SnapshotInteraction;
      });
    if (!snapshotInteraction) {
      snapshotInteraction = new SnapshotInteraction();
      map.addInteraction(snapshotInteraction);
      snapshotInteraction.on('complete', evt => {
        fileSaver(evt.imageData, `MAP-${Math.round(Math.random()*89999+10000)}.png`);
      });
    }
    snapshotInteraction.toImage();
  }
}
