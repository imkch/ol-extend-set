``` javascript
import { registerProjection } from 'oles/proj';
```

注册坐标系。

## 方法

```javascript
registerProjection(code, proj4Str, options);
```

### code

类型：string；SRS标识符代码，例如EPSG:4326

### proj4Str

类型：string；proj.4坐标系，可以在[http://epsg.io](http://epsg.io)查询转换

### options

|名称|类型|描述|
|----|----|----|----|
|code|string|必选，SRS标识符代码，例如EPSG:4326|
|units|string|可选，定义了proj4投影单位|
|extent|module:ol/extent~Extent|可选，有效范围|
|axisOrientation|string|必选，图层数据源|
|global|boolean|可选，自定义请求服务元数据信息的方法|
|metersPerUnit|number|可选，SRS的每单位米|
|worldExtent|module:ol/extent~Extent|可选，SRS的世界范围|
|getPointResolution|function|可选，确定某个点的分辨率的功能|

### 返回值

返回：[module:ol/proj/Projection](https://openlayers.org/en/latest/apidoc/module-ol_proj_Projection-Projection.html)
