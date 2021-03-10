const { terser }  = require('rollup-plugin-terser');
const rollup = require('rollup');
const lodash = require('lodash');
const fs = require('fs');

const baseConfig = require('./rollup.config.base.js');

const baseDir = 'src';
const buildDir = 'lib';
const readFileList = (folder = '/') => {
  const files = fs.readdirSync(baseDir + folder);
  files.forEach((fileName) => {
    const filePath = baseDir + folder + fileName;
    fs.stat(filePath, (err, stats) => {
      if(err) throw err;
      if(stats.isFile()) {
        buildFile(folder, fileName);
      } else if(stats.isDirectory()) {
        readFileList(folder + fileName + '/');
      }
    });
  });
};
const buildFile = (folder, file) => {
  const config = lodash.cloneDeep(baseConfig);
  config.input = baseDir + folder + file;
  config.output.file = buildDir + folder + file;
  Object.assign(config.output, {
    file: buildDir + folder + file,
    name: file.split('.')[0]
  });
  config.plugins.push(terser());
  rollup.rollup(config)
    .then(bundle => {
      bundle.write(config.output);
    });
};
readFileList();