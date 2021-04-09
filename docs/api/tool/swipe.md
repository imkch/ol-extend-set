``` javascript
import Swipe from 'oles/tool/Swipe';
```
地图卷帘对比

## 构造函数

```javascript
new Swipe(options);
```

### map

map对象

### options

|名称|类型|描述|
|----|----|----|----|
|layers|Array[module:ol/layer] (default to [])|可选，需要添加滤镜的Layer|
|position|number (defaults to 0.5)|可选，卷帘分割线位置[0,1]|
|direction|string (defaults to 'vertical')|可选，卷帘布局模式vertical or horizontal|

## 方法

### render()

开启卷帘

### reset()

重置，取消卷帘

### getActive()

当前状态
返回：boolean

### getDirection()

卷帘布局模式
返回：string

### getPosition()

卷帘分割线位置
返回：number

### setLayers(layers)

layers: Array[module:ol/layer]
设置卷帘图层

### setDirection(direction)

direction: string
设置卷帘布局模式

### setPosition(position)
position: number
设置卷帘分割线位置