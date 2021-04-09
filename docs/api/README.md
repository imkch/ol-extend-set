# API

本文主要介绍插件本身扩展的内容，大多数都继承自openlayers原生类，所以如需查看详细API介绍，请移步至openlayers官网[API](https://openlayers.org/en/latest/apidoc/)

## 主要包括内容如下：

```
oles
├── proj
│ └── registerProject                              // 注册坐标系
├── layer
│ ├── TileWMTS                                     // WMTS图层
│ ├── VectorTileArcGISRest                         // ArcGIS矢量切片图层
│ └── VectorTileSuperMapRest                       // SuperMap矢量切片图层
├── source
│ ├── TDT                                          // 天地图数据源
│ ├── XYZArcGISRest                                // ArcGIS缓存切片数据源
│ ├── VectorTileArcGISRest                         // ArcGIS矢量切片数据源
│ ├── VectorTileSuperMapRest                       // SuperMap矢量切片数据源
│ ├── TileSuperMapRest                             // 切片获取SuperMap矢量数据源
│ └── ImageSuperMapRest                            // 图片获取SuperMap矢量数据源
├── control
│ ├── Filter                                       // 地图滤镜
│ ├── FullScreen                                   // 地图全屏
│ ├── Measure                                      // 地图量测
│ ├── Snapshot                                     // 地图快照
│ └── Swipe                                        // 卷帘对比
├── tool
│ ├── Filter                                       // 地图滤镜
│ ├── FullScree                                    // 地图全屏
│ ├── Measure                                      // 地图量测
│ ├── Snapshot                                     // 地图快照
│ └── Swipe                                        // 卷帘对比
├── format
│ └── ArcGISRest                                   // ArcGIS元数据信息格式化
└──index
```