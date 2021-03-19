import Interaction from 'ol/interaction/Interaction';
import domToImage from "dom-to-image";
import fileSaver from "file-saver";

export default class Snapshot extends Interaction {
  constructor(options = {}) {
    super();
    this.options_ = options;
  }
  toImage(callback) {
    const targetElement = this.getMap().getTargetElement();
    domToImage.toBlob(targetElement, this.options_).then((data) => {
      if (callback) {
        callback(data);
      } else {
        const { filename = 'map' } = this.options_;
        fileSaver.saveAs(data, `${filename}.png`);
      }
    });
  }
}

const customSnapshot = (target, options = {}, callback) => {
  if (target === undefined) {
    throw new Error('target is undefined');
  }
  const targetElement = typeof target === 'string' ? document.getElementById(target) : target;
  domToImage.toBlob(targetElement, options).then((data) => {
    if (callback) {
      callback(data);
    } else {
      const { filename = 'map' } = options;
      fileSaver.saveAs(data, `${filename}.png`);
    }
  });
};

export { customSnapshot };