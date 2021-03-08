<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TDTSource from 'ol-extend-set/source/TDT';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { Projection } from 'ol/proj';

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
      proj4.defs('EPSG:4490', '+proj=longlat+ellps=GRS80+no_defs');
      register(proj4);

      const source = new TDTSource({
        tk: '5d4236a2a06043cd0b0880bbf270c958',
        layer: 'img'
      });
      console.log(source);
      const map = new Map({
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 6,
          projection: 'EPSG:4490'
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