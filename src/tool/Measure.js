import { Draw } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import Style from 'ol/style/Style';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
import { unByKey } from 'ol/Observable';
import { getArea, getLength } from 'ol/sphere';
import { LineString, Polygon } from 'ol/geom';

import './measure.css';

const measureLayerId = 'measureLayer';
const continuePolygonMsg = '单击确定地点，双击结束';
const continueLineMsg = '单击确定地点，双击结束';

export default class Measure {
  constructor(map, options = {}) {
    if (!map) {
      console.error("map is required");
      return;
    }
    this.map_ = map;
    this.style_ = options.style || this.createDefaultStyle_();
    this.source_ = options.source || new VectorSource();
    this.active_ = false;
  }
  excute(mode, doOnce = true) {
    this.stop();
    this.mode_ = mode;
    this.active_ = true;
    this.doOnce_ = doOnce;
    const geometryType = mode === 'area' ? 'Polygon' : 'LineString';
    if (this.drawInteraction_) {
      this.map_.removeInteraction(this.drawInteraction_);
      this.drawInteraction_ = null;
    }
    let layer = this.getLayerById_(measureLayerId);
    if (!layer) {
      layer = this.createMeasureLayer_();
    }
    this.createMeasureTooltip_();
    this.createHelpTooltip_();
    this.drawInteraction_ = this.createDraw_(geometryType);
    this.map_.addInteraction(this.drawInteraction_);
    this.mapMoveListener_ = this.map_.on('pointermove', this.handlePointerMove_.bind(this));
  }
  stop() {
    this.type_ = undefined;
    this.active_ = false;
    if (this.helpTooltip_) {
      this.map_.removeOverlay(this.helpTooltip_);
    }
    if (this.drawInteraction_) {
      this.map_.removeInteraction(this.drawInteraction_);
    }
    if (this.mapMoveListener_) {
      unByKey(this.mapMoveListener_);
    }
  }
  getActive() {
    return this.active_;
  }
  getMode() {
    return this.mode_;
  }
  createDraw_(type) {
    const draw = new Draw({type, style: this.style_, source: this.source_, freehand: false});
    draw.on('drawstart', this.handleDrawStart_.bind(this));
    draw.on('drawend', this.handleDrawEnd_.bind(this));
    return draw;
  }
  createDefaultStyle_() {
    const fillColor = 'rgba(0, 0, 255, 0.45)';
    const strokeColor = 'rgba(24, 144, 255, 1)';
    const strokeWidth =  2;
    return new Style({
      fill: new FillStyle({
        color: fillColor
      }),
      stroke: new StrokeStyle({
        color: strokeColor,
        width: strokeWidth
      })
    });
  }
  createMeasureLayer_() {
    const measureLayer = new VectorLayer({
      id: measureLayerId,
      className: measureLayerId,
      source: this.source_,
      style: this.style_
    });
    this.map_.addLayer(measureLayer);
    this.measureLayer_ = measureLayer;
  }
  handleDrawStart_(evt) {
    this.updateInteractionActive_(false);
    this.sketch_ = evt.feature;
    let tooltipCoord = evt.coordinate;
    this.listener_ = this.sketch_.getGeometry().on('change', e => {
      const geom = e.target;
      let output;
      if (geom instanceof Polygon) {
        output = this.calculateArea_(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof LineString) {
        output = this.calculateLength_(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      this.measureTooltipElement_.innerHTML = output;
      this.measureTooltip_.setPosition(tooltipCoord);
    });
  }
  handleDrawEnd_(evt) {
    setTimeout(() => {
      this.updateInteractionActive_(true);
    }, 1000);
    this.measureTooltipElement_.className = 'oles-tooltip oles-tooltip-static';
    const closeElement = document.createElement('span');
    closeElement.className = 'oles-tooltip-close';
    closeElement.innerHTML = 'X';
    this.measureTooltipElement_.appendChild(closeElement);
    this.measureTooltip_.setOffset([0, -7]);

    closeElement.feature = this.sketch_;
    closeElement.overlay = this.measureTooltip_;
    closeElement.addEventListener(
      'click',
      e => {
        const { feature, overlay } = e.target;
        const layer = this.getLayerById_(measureLayerId);
        if (layer) {
          const source = layer.getSource();
          if (source.hasFeature(feature)) {
            layer.getSource().removeFeature(feature);
          }
        }
        this.map_.removeOverlay(overlay);
      },
      {
        once: true
      }
    );
    this.sketch_ = null;
    this.measureTooltipElement_ = null;
    unByKey(this.listener_);
    if (this.doOnce_) {
      this.stop();
    } else {
      this.createMeasureTooltip_();
    }
  }
  createHelpTooltip_() {
    if (this.helpTooltipElement_) {
      this.helpTooltipElement_.parentNode.removeChild(this.helpTooltipElement_);
    }
    this.helpTooltipElement_ = document.createElement('div');
    this.helpTooltipElement_.className = 'oles-tooltip hidden';
    this.helpTooltip_ = new Overlay({
      element: this.helpTooltipElement_,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map_.addOverlay(this.helpTooltip_);
  }
  createMeasureTooltip_() {
    if (this.measureTooltipElement_) {
      this.measureTooltipElement_.parentNode.removeChild(this.measureTooltipElement_);
    }
    this.measureTooltipElement_ = document.createElement('div');
    this.measureTooltipElement_.className = 'oles-tooltip oles-tooltip-measure';
    this.measureTooltip_ = new Overlay({
      element: this.measureTooltipElement_,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map_.addOverlay(this.measureTooltip_);
  }
  handlePointerMove_(evt) {
    if (evt.dragging) {
      return;
    }
    let helpMsg = '单击开始绘制';
    if (this.sketch_) {
      const geom = this.sketch_.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      }
    }
  
    this.helpTooltipElement_.innerHTML = helpMsg;
    this.helpTooltip_.setPosition(evt.coordinate);
  
    this.helpTooltipElement_.classList.remove('hidden');
  }
  calculateArea_(polygon) {
    const area = getArea(polygon, {
      projection: this.map_.getView().getProjection()
    });
    let output;
    if (area > 10000) {
      output = `<font class='oles-tooltip-value'>${Math.round(
        (area / 1000000) * 100
      ) / 100}</font> 平方千米`;
    } else {
      output = `<font class='oles-tooltip-value'>${Math.round(area * 100) /
        100}</font> 平方米`;
    }
    return output;
  }
  calculateLength_(line) {
    const length = getLength(line, {
      projection: this.map_.getView().getProjection()
    });
    let output;
    if (length > 100) {
      output = `<font class='oles-tooltip-value'>${Math.round(
        (length / 1000) * 100
      ) / 100}</font> 千米`;
    } else {
      output = `<font class='oles-tooltip-value'>${Math.round(length * 100) /
        100}</font> 米`;
    }
    return output;
  }
  getLayerById_(id) {
    const layers = this.map_.getLayers();
    let layerObj = null;
    layers.forEach(layer => {
      if (layer.get('id') && layer.get('id') === id) {
        layerObj = layer;
      }
    });
    return layerObj;
  }
  updateInteractionActive_(enable) {
    const interactions = this.map_.getInteractions().getArray();
    interactions.forEach(interaction => {
      if (!(interaction instanceof Draw)) {
        interaction.setActive(enable);
      }
    });
  };
};
