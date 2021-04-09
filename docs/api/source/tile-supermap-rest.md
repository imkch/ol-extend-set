``` javascript
import TileSuperMapRest from 'oles/source/TileSuperMapRest';
```

SuperMap Rest瓦片加载，相对加载效率较快，会根据坐标系计算瓦片规则构造数据源。

## 基类

- [module:ol/source/TileImage](https://openlayers.org/en/latest/apidoc/module-ol_source_TileImage-TileImage.html)

## 构造函数

```javascript
new TileSuperMapRest(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|url|string|必选，服务url|
|hidpi|boolean (default to false)|可选，是否高精度输出|
|format|string (default to 'png')|可选，输出图形的格式|
|params|object (default to {})|可选，SuperMap Rest参数，服务默认值将用于未指定的任何字段，如有指定将被覆盖。|