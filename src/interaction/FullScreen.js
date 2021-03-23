import Interaction from 'ol/interaction/Interaction';

export default class FullScreen extends Interaction {
  constructor(options ={}) {
    super(options);
    this.targetElem_ = typeof options.target === 'string' ? document.getElementById(options.target) : options.target;
  }
  entry() {
    if(!this.isSupported_() || this.isFullScreen_()) return;
    const elem = this.targetElem_ || this.getMap().getTargetElement() || document;
    if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.requestFullScreen) {
      elem.requestFullscreen();
    } else {
      console.log('error');
    }
  }
  exit() {
    if(!this.isFullScreen_()) return;
    const elem = document;
    if (elem.webkitCancelFullScreen) {
      elem.webkitCancelFullScreen();
    } else if (elem.mozCancelFullScreen) {
      elem.mozCancelFullScreen();
    } else if (elem.cancelFullScreen) {
      elem.cancelFullScreen();
    } else if (elem.exitFullscreen) {
      elem.exitFullscreen();
    } else {
      console.log('error');
    }
  }
  getState() {
    return this.isFullScreen_();
  }
  isFullScreen_() {
    return !!(
      document['webkitIsFullScreen'] ||
      document['msFullscreenElement'] ||
      document.fullscreenElement
    );
  }
  isSupported_() {
    const body = document.body;
    return !!(
      body['webkitRequestFullscreen'] ||
      (body['msRequestFullscreen'] && document['msFullscreenEnabled']) ||
      (body.requestFullscreen && document.fullscreenEnabled)
    );
  }
};
