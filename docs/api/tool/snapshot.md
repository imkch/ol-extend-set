``` javascript
import Snapshot from 'oles/tool/Snapshot';
```
地图快照

## 构造函数

```javascript
new Snapshot(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|filter|function|可选，过滤的节点，不需要在出图中显示|
|bgcolor|string|可选，背景颜色|
|height|number|可选，高度|
|width|number|可选，宽度|
|style|function|可选，样式|
|quality|number default to 1.0|可选，图片质量0-1|
|cacheBust|boolean default to false|可选，启用缓存|
|imagePlaceholder|string)|可选，占位符图像|

## 方法

### toImage(target)

开始测量
target：HTMLElement or string; default to document
