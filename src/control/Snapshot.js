import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';
import fileSaver from 'file-saver';

import SnapshotTool from '../tool/Snapshot';
export default class Snapshot extends Control {
  constructor(options = {}) {
    super({
      element: document.createElement('div'),
      target: options.target
    });
    const label = options.label !== undefined ? options.label : 'S';
    const tipLabel = options.tipLabel !== undefined ? options.tipLabel : '快照';
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

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-snapshot`;
    this.element.className = cssClasses;
    this.element.appendChild(button);
  }
  handleClick_(event) {
    event.preventDefault();
    this.mapToImage_();
  }
  mapToImage_() {
    if(!this.snapshotTool) {
      this.snapshotTool = new SnapshotTool({filter: node => {
        return (node.className !== 'ol-overlaycontainer-stopevent');
      }});
    }
    const mapElement = this.getMap().getTargetElement();
    this.snapshotTool.toImage(mapElement).then(data => {
      fileSaver.saveAs(data, `MAP-${Math.round(Math.random()*89999+10000)}.png`);
    });
  }
}
