``` javascript
import TileWMTS from 'oles/layer/TileWMTS';
```

WMTS服务，调用服务GetCapabilities接口读取服务元数据信息初始化ol.source。

## 基类

- [module:ol/layer/Tile](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)

## 构造函数

```javascript
new TileWmts(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|source|module:ol/source/WMTS|必选，图层数据源|
|capableLoadFunction|function (defaults to fetch)|可选，自定义请求服务元数据信息的方法|
