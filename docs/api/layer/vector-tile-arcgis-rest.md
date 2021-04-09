``` javascript
import VectorTileArcGISRest from 'oles/layer/VectorTileArcGISRest';
```

ArcGIS矢量切片服务，获取服务style数据构造矢量切片样式，需要配合oles.source.VectorTileArcGISRest一起使用。

## 基类

- [module:ol/layer/VectorTile](https://openlayers.org/en/latest/apidoc/module-ol_VectorTile-VectorTile.html)

## 构造函数

```javascript
new VectorTileArcGISRest(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|source|module:ol/source/VectorTileArcGISRest|必选，图层数据源|
|styleLoadFunction|function (defaults to fetch)|可选，自定义请求服务Style的方法|