``` javascript
import ArcGISRest from 'oles/format/ArcGISRest';
```

ArcGIS Rest元数据信息格式化。

## 构造函数

```javascript
new ArcGISRest(options);
```

### options

类型：object or string；元数据信息

## 方法

### read()

返回：Object
示例：{extent, origin, tileSize, tileGrid}

### readExtent()

返回：module:ol/extent

### readResolutions()

返回：Array[number]

### readOrigin()

返回：module:ol/coordinate

### readTileSize()

返回：module:ol/size

### readTileGrid()

返回：module:ol/tilegrid/TileGrid