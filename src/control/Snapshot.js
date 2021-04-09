import Control from 'ol/control/Control';
import EventType from 'ol/events/EventType';
import { CLASS_UNSELECTABLE } from 'ol/css';
import fileSaver from 'file-saver';

import SnapshotTool from '../tool/Snapshot';

import snapshotSvg from '../icon/snapshot.svg';
export default class Snapshot extends Control {
  constructor(options = {}) {
    options.element = options.element || document.createElement('div');
    super(options);

    const icon = options.icon ? (typeof options.icon === 'string' ? this.createIcon_(options.icon) : options.icon) : this.createIcon_(snapshotSvg);
    const label = options.label !== undefined ? options.label : '快照';
    const button = document.createElement('div');
    button.className = 'oles-button';
    button.title = label;
    button.appendChild(icon);

    button.addEventListener(
      EventType.CLICK,
      this.handleClick_.bind(this),
      false
    );

    const cssClasses = `${CLASS_UNSELECTABLE} oles-control oles-snapshot`;
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
    this.mapToImage_();
  }
  mapToImage_() {
    if(!this.snapshotTool) {
      this.snapshotTool = new SnapshotTool();
    }
    const mapElement = this.getMap().getTargetElement();
    this.snapshotTool.toImage(mapElement).then(data => {
      fileSaver.saveAs(data, `MAP-${Math.round(Math.random()*89999+10000)}.png`);
    });
  }
}
