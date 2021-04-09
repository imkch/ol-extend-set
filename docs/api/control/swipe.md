``` javascript
import Swipe from 'oles/control/Swipe';
```
卷帘对比

## 构造函数

```javascript
new Swipe(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|horizontalIcon|HTMLElement or string (defaults to 'img')|可选，卷帘横向对比图标（html元素或者路径）|
|horizontalLabel|string (defaults to '卷帘横向对比')|可选，卷帘横向对比名称|
|verticalIcon|HTMLElement or string (defaults to 'img')|可选，卷帘纵向对比图标（html元素或者路径）|
|verticalLabel|string (defaults to '卷帘纵向对比')|可选，卷帘纵向对比名称|
|direction|string (default to 'row')|可选，排列方向（row、row-reverse、column、column-reverse）|
|layers|Array[module:ol/layer] (default to [])|可选，需要卷帘的Layer|