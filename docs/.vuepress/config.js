const path = require('path');
module.exports = {
  base: '/ol-extend-set/dist/',
  dest: 'dist',
  title: 'ol-ext-set',
  description: 'OpenLayer扩展工具集合',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      // { text: '指南', link: '/guide/' },
      // { text: 'API', link: '/api/' },
      { text: '样例', link: '/examples/' },
      { text: 'GitHub', link: 'https://github.com', target:'_blank' },
    ],
    sidebar: {
      '/examples/': [
        {
          title: '样例'
        }
      ],
      '/api/': [
        {
          title: 'API',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            {
              title: '数据源',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['supermap-vector-tile', 'SuperMap矢量切片'],
                ['arcgis-vector-tile', 'ArcGIS矢量切片'],
                ['wmts', 'WMTS'],
                ['tdt', '天地图'],
                ['arcgis-xyz', 'ArcGIS切片服务']
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
        'ol-extend-set': path.resolve(__dirname, '../../lib/')
      }
    }
  }
}