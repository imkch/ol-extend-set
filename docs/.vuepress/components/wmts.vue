<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileWMTSLayer from 'ol-extend-set/layer/TileWMTS';
import WMTSSource from 'ol/source/WMTS';

export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/WMTS';
      const source = new WMTSSource({
        url
      });
      const map = new Map({
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2,
          projection: 'EPSG:3857'
        }),
        layers: [
          new TileWMTSLayer({
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