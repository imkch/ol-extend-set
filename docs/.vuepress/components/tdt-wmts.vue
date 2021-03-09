<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import WMTSTDTSource from 'ol-extend-set/source/WMTSTDT';
import { registerProjection } from 'ol-extend-set/proj';

export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 注册4490坐标系
      const projection = registerProjection('EPSG:4490', '+proj=longlat+ellps=GRS80+no_defs', { units: 'degrees' });
      const source = new WMTSTDTSource({
        tk: '5d4236a2a06043cd0b0880bbf270c958',
        layer: 'img'
      });
      const map = new Map({
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 6,
          projection
        }),
        layers: [
          new TileLayer({
            source
          })
        ]
      });
    }
  }
}
</script>
<style>
#map {
  height: 500px;
}
</style>