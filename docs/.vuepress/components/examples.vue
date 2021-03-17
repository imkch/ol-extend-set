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
              cover: '../img/wmts.png',
              name: '加载OGC标准服务WMTS',
              url: '../demo/wmts.html'
            },
            {
              cover: '../img/wmts.png',
              name: '加载天地图',
              url: '../demo/tdt-wmts.html'
            },
            {
              cover: '../img/wmts.png',
              name: '使用XYZ方式加载ArcGIS切片',
              url: '../demo/arcgis-xyz.html'
            },
            {
              cover: '../img/wmts.png',
              name: '加载ArcGIS矢量切片',
              url: '../demo/arcgis-vector-tile.html'
            },
            {
              cover: '../img/wmts.png',
              name: '加载SuperMap矢量切片',
              url: '../demo/supermap-vector-tile.html'
            },
            {
              cover: '../img/wmts.png',
              name: '切片加载SuperMap Rest服务',
              url: '../demo/supermap-rest-tile.html'
            },
            {
              cover: '../img/wmts.png',
              name: '全图加载SuperMap Rest服务',
              url: '../demo/supermap-rest-image.html'
            }
          ]
        }
      ]
    };
  }
}
</script>
<style>
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
  font-size: 18px;
  color: rgba(0, 0, 0, .6);
}
.card-none {
  flex-grow: 1;
  height: 0;
  margin: 8px;
  width: 300px;
}
</style>