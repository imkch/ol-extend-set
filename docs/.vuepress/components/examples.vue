<template>
  <div class="examples">
    <div class="module" v-for="(m, idx) in examples" :key="idx">
      <h2>{{ m.name }}</h2>
      <div class="demos">
        <a class="card" :href="item.url" v-for="(item, index) in m.demoList" :key="index" target="_blank">
          <div class="card-cover">
            <img :src="item.cover"/>
          </div>
          <h3>{{ item.name }}</h3>
        </a>
        <a class="card-none"></a>
        <a class="card-none"></a>
        <a class="card-none"></a>
        <a class="card-none"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      examples: [
        {
          name: '数据源',
          demoList: [
            {
              cover: '../img/custom-wmts.png',
              name: '自定义加载OGC标准服务WMTS',
              url: '../demo/custom-wmts.html'
            },
            {
              cover: '../img/tile-wmts.png',
              name: '加载OGC标准服务WMTS',
              url: '../demo/tile-wmts.html'
            },
            {
              cover: '../img/tdt.png',
              name: '加载天地图',
              url: '../demo/tdt.html'
            },
            {
              cover: '../img/arcgis-xyz.png',
              name: '使用XYZ方式加载ArcGIS切片',
              url: '../demo/arcgis-xyz.html'
            },
            {
              cover: '../img/supermap-rest-tile.png',
              name: '切片加载SuperMap Rest服务',
              url: '../demo/supermap-rest-tile.html'
            },
            {
              cover: '../img/supermap-rest-image.png',
              name: '全图加载SuperMap Rest服务',
              url: '../demo/supermap-rest-image.html'
            },
            {
              cover: '../img/arcgis-vector-tile.png',
              name: '加载ArcGIS矢量切片',
              url: '../demo/arcgis-vector-tile.html'
            },
            {
              cover: '../img/supermap-vector-tile.png',
              name: '加载SuperMap矢量切片',
              url: '../demo/supermap-vector-tile.html'
            }
          ]
        },
        {
          name: '坐标系',
          demoList: [
            {
              cover: '../img/custom-coordinate-system.png',
              name: '自定义坐标系：用4490坐标系加载天地图',
              url: '../demo/custom-coordinate-system.html'
            }
          ]
        },
        {
          name: '地图控件',
          demoList: [
            {
              cover: '../img/control-layout.png',
              name: 'Control布局',
              url: '../demo/control-layout.html'
            },
            {
              cover: '../img/zoom.png',
              name: '地图缩放',
              url: '../demo/zoom.html'
            },
            {
              cover: '../img/full-extent.png',
              name: '地图全图',
              url: '../demo/full-extent.html'
            },
            {
              cover: '../img/snapshot.png',
              name: '地图快照',
              url: '../demo/snapshot.html'
            },
            {
              cover: '../img/filter.png',
              name: '地图滤镜',
              url: '../demo/filter.html'
            },
            {
              cover: '../img/measure.png',
              name: '地图测量',
              url: '../demo/measure.html'
            },
            {
              cover: '../img/full-screen.png',
              name: '地图全屏',
              url: '../demo/full-screen.html'
            },
            {
              cover: '../img/swipe.png',
              name: '卷帘对比',
              url: '../demo/swipe.html'
            }
          ]
        }
      ]
    };
  }
}
</script>
<style>
.examples {
  margin-top: 16px;
}
.examples h2 {
  margin: 8px;
  border: none;
}
.demos {
  display: flex;
  flex-wrap: wrap;
}
.card{
  box-shadow: 0 6px 14px 0 rgb(18 18 18 / 6%);
  overflow: hidden;
  margin: 8px;
  flex-grow: 1;
  width: 300px;
}
.card:hover {
  text-decoration: none !important;
}

.card-cover {
  height: 160px;
  overflow: hidden;
}

.card-cover img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: all .6s;
}
.card:hover img {
  transform: scale(1.5);
}
.card h3 {
  margin: 16px;
  font-size: 16px;
  color: rgba(0, 0, 0, .6);
}
.card-none {
  flex-grow: 1;
  height: 0;
  margin: 8px;
  width: 300px;
}
</style>