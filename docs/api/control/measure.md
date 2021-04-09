``` javascript
import Measure from 'oles/control/Measure';
```
地图测量

## 构造函数

```javascript
new Measure(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|areaIcon|HTMLElement or string (defaults to 'img')|可选，测量面积图标（html元素或者路径）|
|areaLabel|string (defaults to '测量面积')|可选，测量面积名称|
|lengthIcon|HTMLElement or string (defaults to 'img')|可选，测量长度图标（html元素或者路径）|
|lengthLabel|string (defaults to '测量长度')|可选，测量长度名称|
|direction|string (default to 'row')|可选，排列方向（row、row-reverse、column、column-reverse）|