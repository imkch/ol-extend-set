``` javascript
import XYZArcGISRest from 'oles/source/XYZArcGISRest';
```

ArcGIS Rest缓存切片服务，获取服务元数据信息，根据切片信息构造数据源。

## 基类

- [module:ol/source/XYZ](https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html)

## 构造函数

```javascript
new XYZArcGISRest(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|url|string|必选，服务url|
|tileInfoLoadFunction|function (default to fetch)|可选，获取服务切片信息的方法|