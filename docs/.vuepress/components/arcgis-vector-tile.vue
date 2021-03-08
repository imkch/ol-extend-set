<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import VectorTileArcGISRestLayer from 'ol-extend-set/layer/VectorTileArcGISRest';
import VectorTileArcGISRestSource from 'ol-extend-set/source/VectorTileArcGISRest';
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const url = 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer';
      const source = new VectorTileArcGISRestSource({
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
          new VectorTileArcGISRestLayer({
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