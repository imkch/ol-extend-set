``` javascript
import Measure from 'oles/tool/Measure';
```
地图测量，包含测量面积、测量距离

## 构造函数

```javascript
new Measure(options);
```

### map

map对象

### options

|名称|类型|描述|
|----|----|----|----|
|style|module:ol/style/Style (default to new Style())|可选，测量绘制要素渲染的样式|
|source|module:ol/source/Vector] (default to new VectorSource())|可选，测量绘制要素渲染的数据源|

## 方法

### excute(mode, doOnce)

开始测量
mode：string; 值包含：'area' || 'length'

### stop()

停止测量

### getActive()

当前状态
返回：boolean

### getMode()

当前模式
返回：string