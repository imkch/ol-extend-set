``` javascript
import VectorTileArcGISRest from 'oles/source/VectorTileArcGISRest';
```

ArcGIS矢量切片服务数据源，可控制需要显示的图层，需要配合oles.layer.VectorTileArcGISRest一起使用。

## 基类

- [module:ol/source/VectorTile](https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html)

## 构造函数

```javascript
new VectorTileArcGISRest(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|url|string|必选，服务URL|
|layers|Array[string] (default to undefined)|可选，需要显示的图层id集合；默认为undefined时显示所有图层|