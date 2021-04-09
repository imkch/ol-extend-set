``` javascript
import Filter from 'oles/control/Filter';
```
地图滤镜

## 构造函数

```javascript
new Filter(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|icon|HTMLElement or string (defaults to 'img')|可选，图标（html元素或者路径）|
|label|string (defaults to '滤镜')|可选，名称|
|layers|Array[module:ol/layer] (default to [])|可选，需要添加滤镜的Layer|