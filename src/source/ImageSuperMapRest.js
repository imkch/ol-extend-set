import Image, { defaultImageLoadFunction } from 'ol/source/Image';
import { appendParams } from 'ol/uri';
import { containsExtent, getHeight, getWidth } from 'ol/extent.js';
import ImageWrapper from 'ol/Image';


function getRequestUrl(url, viewExtent, imageSize, params, format) {
  const viewBounds = {
    leftBottom: {
      x: viewExtent[0],
      y: viewExtent[1]
    },
    rightTop: {
      x: viewExtent[2],
      y: viewExtent[3]
    }
  };
  params['width'] = imageSize[0];
  params['height'] = imageSize[1];
  params['viewBounds'] = JSON.stringify(viewBounds);
  const modifiedUrl = url + '/image.' + format;
  return appendParams(modifiedUrl, params);
}

export default class ImageSuperMapRest extends Image {
  constructor(options) {
    super(options);
    this.url_ = options.url;
    this.hidpi_ = options.hidpi !== undefined ? options.hidpi : false;
    this.format_ = options.format ? options.format : 'png';
    this.params_ = options.params || {};
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;
    this.crossOrigin_ =
      options.crossOrigin !== undefined ? options.crossOrigin : null;
    this.imageLoadFunction_ =
      options.imageLoadFunction !== undefined
        ? options.imageLoadFunction
        : defaultImageLoadFunction;
  }
  getImageInternal(extent, resolution, pixelRatio) {
    if (this.url_ === undefined) {
      return null;
    }
    resolution = this.findNearestResolution(resolution);
    pixelRatio = this.hidpi_ ? pixelRatio : 1;

    const image = this.image_;
    if (
      image &&
      this.renderedRevision_ == this.getRevision() &&
      image.getResolution() == resolution &&
      image.getPixelRatio() == pixelRatio &&
      containsExtent(image.getExtent(), extent)
    ) {
      return image;
    }
    const baseParams = {
      'transparent': true,
      'redirect': false,
      'cacheEnabled': true,
      'overlapDisplayed': false
    };
    Object.assign(baseParams, this.params_);

    extent = extent.slice();
    const centerX = (extent[0] + extent[2]) / 2;
    const centerY = (extent[1] + extent[3]) / 2;
    if (this.ratio_ != 1) {
      const halfWidth = (this.ratio_ * getWidth(extent)) / 2;
      const halfHeight = (this.ratio_ * getHeight(extent)) / 2;
      extent[0] = centerX - halfWidth;
      extent[1] = centerY - halfHeight;
      extent[2] = centerX + halfWidth;
      extent[3] = centerY + halfHeight;
    }

    const imageResolution = resolution / pixelRatio;

    const width = Math.ceil(getWidth(extent) / imageResolution);
    const height = Math.ceil(getHeight(extent) / imageResolution);

    extent[0] = centerX - (imageResolution * width) / 2;
    extent[2] = centerX + (imageResolution * width) / 2;
    extent[1] = centerY - (imageResolution * height) / 2;
    extent[3] = centerY + (imageResolution * height) / 2;

    const imageSize = [width, height];
    
    const url = getRequestUrl(
      this.url_,
      extent,
      imageSize,
      baseParams,
      this.format_
    );
    this.image_ = new ImageWrapper(
      extent,
      resolution,
      pixelRatio,
      url,
      this.crossOrigin_,
      this.imageLoadFunction_
    );

    this.renderedRevision_ = this.getRevision();

    this.image_.addEventListener(
      'change',
      this.handleImageChange.bind(this)
    );

    return this.image_;
  }
}
