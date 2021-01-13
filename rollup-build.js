const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const { terser }  = require('rollup-plugin-terser');
const rollup = require('rollup');
const lodash = require('lodash');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';

const external = id => ['ol', 'ol-mapbox-style'].includes(id) || /^(ol|@babel\/runtime)\/.+/.test(id);
const rollupConfig = {
  input: '',
  output: {
    format: 'umd'
  },
  external,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    !isDev && terser()
  ]
};

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
  const config = lodash.cloneDeep(rollupConfig);
  config.input = baseDir + folder + file;
  Object.assign(config.output, {
    file: buildDir + folder + file,
    name: file.split('.')[0]
  });
  rollup.rollup(config)
    .then(bundle => {
      bundle.write(config.output);
    });
};
readFileList();