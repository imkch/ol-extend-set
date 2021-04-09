const path = require('path');
module.exports = {
  base: '/ol-extend-set/dist/',
  dest: 'dist',
  title: 'ol-extend-set',
  description: '基于OpenLayers的扩展类集合',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '样例', link: '/examples/' },
      { text: '生态', items: [
        {
          text: 'Openlayers',
          link: 'https://openlayers.org/',
          target:'_blank'
        },
        {
          text: '插件',
          items: [
            {
              text: 'ol-ext',
              link: 'https://github.com/Viglino/ol-ext',
              target:'_blank'
            },
            {
              text: 'ol3Echarts',
              link: 'https://github.com/sakitam-fdd/ol3Echarts',
              target:'_blank'
            }
          ]
        }
      ]},
      { text: 'GitHub', link: 'https://github.com/imkch/ol-extend-set', target:'_blank' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['', '快速上手']
          ]
        }
      ],
      '/api/': [
        {
          title: 'API',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            {
              title: 'layer',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                ['layer/tile-wmts', 'TileWMTS'],
                ['layer/vector-tile-arcgis-rest', 'VectorTileArcGISRest'],
                ['layer/vector-tile-supermap-rest', 'VectorTileSuperMapRest']
              ]
            },
            {
              title: 'source',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                ['source/tdt', 'TDT'],
                ['source/xyz-arcgis-rest', 'XYZArcGISRest'],
                ['source/vector-tile-arcgis-rest', 'VectorTileArcGISRest'],
                ['source/vector-tile-supermap-rest', 'VectorTileSuperMapRest'],
                ['source/image-supermap-rest', 'ImageSuperMapRest'],
                ['source/tile-supermap-rest', 'TileSuperMapRest']
              ]
            },
            {
              title: 'proj',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                ['proj/register-projection', 'registerProjection']
              ]
            },
            {
              title: 'control',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                ['control/box', 'Box'],
                ['control/container', 'Container'],
                ['control/zoom', 'Zoom'],
                ['control/full-extent', 'FullExtent'],
                ['control/filter', 'Filter'],
                ['control/full-screen', 'FullScreen'],
                ['control/measure', 'Measure'],
                ['control/snapshot', 'Snapshot'],
                ['control/swipe', 'Swipe']
              ]
            },
            {
              title: 'tool',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                ['tool/filter', 'Filter'],
                ['tool/full-screen', 'FullScreen'],
                ['tool/measure', 'Measure'],
                ['tool/snapshot', 'Snapshot'],
                ['tool/swipe', 'Swipe']
              ]
            },
            {
              title: 'format',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                ['format/arcgis-rest', 'ArcGISRest']
              ]
            }
          ]
        }
      ]
    }
  },
  plugins: {
    'demo-container': {
      component: 'CustomDemoBlock',
      'locales': [
        {
          "lang": "zh-CN",
          "demo-block": {
            "hide-text": "隐藏代码",
            "show-text": "显示代码",
            "copy-text": "复制代码",
            "copy-success": "复制成功"
          }
        },
        {
          "lang": "en-US",
          "demo-block": {
            "hide-text": "隐藏代码",
            "show-text": "显示代码",
            "copy-text": "复制代码",
            "copy-success": "复制成功"
          }
        }
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'oles': path.resolve(__dirname, '../../oles/')
      }
    }
  }
}