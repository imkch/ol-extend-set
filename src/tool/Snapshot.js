import domToImage from 'dom-to-image';

export default class Snapshot {
  constructor(options = {}) {
    this.options_ = options;
  }
  toImage(target) {
    const customElement =  target ? (typeof target === 'string' ? document.getElementById(target) : target) : undefined;
    const targetElement = customElement || document;
    return domToImage.toBlob(targetElement, this.options_);
  }
}
