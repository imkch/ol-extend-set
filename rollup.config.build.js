const { terser }  = require('rollup-plugin-terser');
const rollup = require('rollup');
const lodash = require('lodash');
const fs = require('fs');
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
const readFileList = (folder = '/') => {
  const files = fs.readdirSync(baseDir + folder);
  files.forEach((fileName) => {
    if(excludeDir.indexOf(fileName) < 0) {
      const filePath = baseDir + folder + fileName;
      fs.stat(filePath, (err, stats) => {
        if(err) throw err;
        if(stats.isFile()) {
          fileName.indexOf('.js') > -1 && buildFile(folder, fileName);
        } else if(stats.isDirectory()) {
          readFileList(folder + fileName + '/');
        }
      });
    }
  });
};
const buildFile = (folder, file) => {
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
  rollup.rollup(config)
    .then(bundle => {
      bundle.write(config.output);
    });
};
readFileList();

const copyFiles = ['package.json', '.npmignore'];
copyFiles.forEach(file => {
  fs.copyFile(file, `oles/${file}`, error => {
    if(error) console.log(error);
    else console.log(`copy ${file} succeed`);
  });
});
