<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZArcGISRest from 'ol-extend-set/source/XYZArcGISRest';

export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer';
      const source = new XYZArcGISRest({
        url
      });
      const map = new Map({
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2
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