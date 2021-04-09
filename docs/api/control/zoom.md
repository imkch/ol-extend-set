``` javascript
import Zoom from 'oles/control/Zoom';
```
地图缩放

## 构造函数

```javascript
new Zoom(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|zoomInIcon|HTMLElement or string (defaults to 'img')|可选，放大图标（html元素或者路径）|
|zoomInlabel|string (defaults to '放大')|可选，放大名称|
|zoomOutIcon|HTMLElement or string (defaults to 'img')|可选，缩小图标（html元素或者路径）|
|zoomOutLabel|string (defaults to '缩小')|可选，缩小名称|
|direction|string (default to 'row')|可选，排列方向（row、row-reverse、column、column-reverse）|