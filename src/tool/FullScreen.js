export default class FullScreen {
  constructor(options ={}) {
    this.targetElement_ = (typeof options.target === 'string' ? document.getElementById(options.target) : options.target) || document.body;
  }
  entry() {
    if(!this.isSupported_() || this.isFullScreen_()) return;
    const elem = this.targetElement_;
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
  getActive() {
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
