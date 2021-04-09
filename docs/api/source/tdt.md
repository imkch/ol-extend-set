``` javascript
import TDT from 'oles/source/TDT';
```

符合OGC WMTS标准的天地图服务，包含矢量底图(vec)、矢量注记(cva)、影像底图(img)、影像注记(cia)、地形晕渲(ter)、地形注记(cta)等；投影类型包含经纬度投影(c)和球面墨卡托投影(w)。[在线地图服务详情](http://lbs.tianditu.gov.cn/server/MapService.html)

天地图地图服务对所有用户开放。使用本组服务之前，需要申请Key。

## 基类

- [module:ol/source/WMTS](https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html)

## 构造函数

```javascript
new TDT(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|token|string|必选，在天地图平台申请的服务使用密钥key|
|matrixSet|string (default to 'c')|可选，选用哪种坐标矩阵加载，可选值：'c'、'w'|
|layer|string (default to 'vec')|可选，需要显示的图层，可选值：'vec'、'cva'、'img'、'cia'、'ter'、'cta'|