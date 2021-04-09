## 下载安装

### 通过NPM安装，import导入

```bash
npm install --save oles
```
```javascript
import 'oles/lib/oles.css';
import oles from 'oles';
```
### 通过Script标签引入

```html
<link href="https://unpkg.com/oles/lib/oles.css">

<script src="https://unpkg.com/oles/lib/oles.js"></script>
```
## 使用

### 一次性导入

```javascript
import 'oles/lib/oles.css';
import oles from 'oles';

new oles.source.TDT();
```

### 按需导入

```javascript
import TDT from 'oles/source/TDT';

new TDT();
```
