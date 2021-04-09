``` javascript
import Filter from 'oles/tool/Filter';
```
地图滤镜

## 构造函数

```javascript
new Filter(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|layers|Array[module:ol/layer] (default to [])|可选，需要添加滤镜的Layer|
|mode|string (defaults to 'gray')|可选，滤镜风格|

## 方法

### render()

开启滤镜渲染

### reset()

重置，取消滤镜

### getActive()

当前状态
返回：boolean

### getMode()

滤镜风格
返回：string

### setMode(mode)

mode: string (defaults to 'gray')
设置滤镜风格

### setLayers(layers)

layers: Array[module:ol/layer]
设置滤镜图形