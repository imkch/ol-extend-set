``` javascript
import ImageSuperMapRest from 'oles/source/ImageSuperMapRest';
```

SuperMap Rest图片加载，根据可视化范围生成请求一张图片渲染，相对效率较慢。

## 基类

- [module:ol/source/Image](https://openlayers.org/en/latest/apidoc/module-ol_source_Image.html)

## 构造函数

```javascript
new ImageSuperMapRest(options);
```
### options

|名称|类型|描述|
|----|----|----|----|
|url|string|必选，服务url|
|hidpi|boolean (default to false)|可选，是否高精度输出|
|format|string (default to 'png')|可选，输出图形的格式|
|params|object (default to {})|可选，SuperMap Rest参数，服务默认值将用于未指定的任何字段，如有指定将被覆盖。|
|ratio|number (default to 1.5)|可选，1表示图像请求是地图视口2的大小，是地图视口的大小的两倍|
|crossOrigin|string (default to undefined)|可选，crossOrigin加载图像的属性，crossOrigin如果要使用Canvas渲染器访问像素数据，则必须提供一个值|
|imageLoadFunction|module:ol/Image~LoadFunction (default)|可选，以给定URL加载图像|