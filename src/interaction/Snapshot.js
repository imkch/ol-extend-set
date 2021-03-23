import Interaction from 'ol/interaction/Interaction';
import Event from 'ol/events/Event';
import domToImage from 'dom-to-image';

export class SnapshotEvent extends Event {
  constructor(type, data) {
    super(type);
    this.imageData = data;
  }
}

const SnapshotEventType = {
  COMPLETE: 'complete'
};

export default class Snapshot extends Interaction {
  constructor(options = {}) {
    super();
    this.options_ = options;
  }
  toImage(target) {
    const customElement =  target ? (typeof target === 'string' ? document.getElementById(target) : target) : undefined;
    const mapElement = this.getMap() ? this.getMap().getTargetElement() : undefined;
    const targetElement = customElement || mapElement || document;
    domToImage.toBlob(targetElement, this.options_).then((data) => {
      this.dispatchEvent(new SnapshotEvent(SnapshotEventType.COMPLETE, data));
    });
  }
}
