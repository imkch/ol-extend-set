<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import VectorTileSuperMapRestLayer from 'ol-extend-set/layer/VectorTileSuperMapRest';
import VectorTileSuperMapRestSource from 'ol-extend-set/source/VectorTileSuperMapRest';
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const url = 'http://support.supermap.com:8090/iserver/services/map-china400/restjsr/v1/vectortile/maps/ChinaDark';
      const source = new VectorTileSuperMapRestSource({
        format: new MVT(),
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
          new VectorTileSuperMapRestLayer({
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