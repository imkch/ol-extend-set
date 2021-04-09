``` javascript
import FullScreen from 'oles/tool/FullScreen';
```
全屏

## 构造函数

```javascript
new FullScreen(options);
```

### options

|名称|类型|描述|
|----|----|----|----|
|target|HTMLElement or string (default to document.body)|可选，需要全屏的dom对象或dom节点id|

## 方法

### entry()

开启全屏模式

### exit()

退出全屏模式，ESC也可以取消

### getActive()

当前状态
返回：boolean
