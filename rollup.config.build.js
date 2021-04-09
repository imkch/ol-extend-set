const { terser }  = require('rollup-plugin-terser');
const rollup = require('rollup');
const lodash = require('lodash');
const fs = require('fs');
const afs = require('async-file');
const css = require('rollup-plugin-css-porter');

const transformStrName = (str) => {
  var re = /-(\w)/g;
  return str.replace(re, ($0, $1) => {
      return $1.toUpperCase();
  });
};

const baseConfig = require('./rollup.config.base.js');

const baseDir = 'src';
const buildDir = 'oles';
const excludeDir = 'icon';
const readFileList = async (folder = '/') => {
  const files = await afs.readdir(baseDir + folder);
  for (const fileName of files) {
    if(excludeDir.indexOf(fileName) < 0) {
      const filePath = baseDir + folder + fileName;
      if((await afs.lstat(filePath)).isDirectory()) {
        await readFileList(folder + fileName + '/');
      } else {
        fileName.indexOf('.js') > -1 && await buildFile(folder, fileName);
      }
    }
  }
};
const buildFile = async (folder, file) => {
  const config = lodash.cloneDeep(baseConfig);
  config.input = baseDir + folder + file;
  config.output.file = buildDir + folder + file;
  const name = file === 'index.js' ? (folder === '/' ? 'oles' : folder.split('/')[1]) : file.split('.')[0];
  Object.assign(config.output, {
    file: buildDir + folder + file,
    name: transformStrName(name)
  });
  config.plugins.push(
    css({
      raw: false,
      minified: buildDir + folder + `${file.split('.')[0]}.css`
    })
  );
  config.plugins.push(terser());
  const bundle = await rollup.rollup(config);
  bundle.write(config.output);
};

const deleteFolder = async (path) => {
  const exists = await afs.exists(path);
  if (exists) {
    const files = await afs.readdir(path);
    for (const file of files) {
      const curPath = path + '/' + file;
      if((await afs.lstat(curPath)).isDirectory()) {
        await deleteFolder(curPath);
      } else {
        await afs.unlink(curPath);
      }
    }
    await afs.rmdir(path);
  }
};
const copyFileList = (copyFiles) => {
  copyFiles.forEach(file => {
    fs.copyFile(file, `oles/${file}`, error => {
      if(error) console.log(error);
      else console.log(`copy ${file} succeed`);
    });
  });
};

(async function() {
  await deleteFolder('oles');
  await readFileList();
  const files = ['package.json', '.npmignore', 'README.md']
  copyFileList(files);
})();

