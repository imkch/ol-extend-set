<template>
  <div id="map"></div>
</template>
<script>
import 'ol/ol.css';
import 'oles/index.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TDT from 'oles/source/TDT';
import { Box, Container, Swipe, Measure, Snapshot, Filter, FullScreen, FullExtent, Zoom } from 'oles/control';
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const vecLayer = new TileLayer({
        source: new TDT({
          token: '5d4236a2a06043cd0b0880bbf270c958',
          layer: 'vec',
          matrixSet: 'w',
          crossOrigin: 'anonymous'
        })
      });
      const cvaLayer = new TileLayer({
        source: new TDT({
          token: '5d4236a2a06043cd0b0880bbf270c958',
          layer: 'cva',
          matrixSet: 'w',
          crossOrigin: 'anonymous'
        })
      });
      const map = new Map({
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 0
        }),
        layers: [
          vecLayer,
          cvaLayer
        ]
      });
      const boxControl = {
        instance: new Box(),
        children: [
          {
            instance: new Container({ position: 'top-right'}),
            children: [
              {
                instance: new Swipe({layers: [cvaLayer]}),
              },
              {
                instance: new Measure(),
              }
            ]
          },
          {
            instance: new Container({position: 'bottom-right', direction: 'column-reverse'}),
            children: [
              {
                instance: new Snapshot(),
              },
              {
                instance: new Filter(),
              },
              {
                instance: new FullScreen(),
              },
              {
                instance: new FullExtent(),
              },
              {
                instance: new Zoom()
              }
            ]
          }
        ]
      };
      const addControlChildren = (control) => {
        const { instance, children } = control;
        if(children && children.length >0) {
          children.forEach(item => {
            instance.appendChild(item.instance);
            addControlChildren(item);
          });
        }
      };
      map.addControl(boxControl.instance);
      addControlChildren(boxControl);
    }
  }
}
</script>
<style>
#map {
  height: 400px;
}
</style>