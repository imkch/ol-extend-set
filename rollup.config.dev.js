const rollup = require('rollup');
const lodash = require('lodash');

const config = require('./rollup.config.base.js');

config.input = 'src/oles.js';
Object.assign(config.output, {
  file: 'docs/.vuepress/public/demo/lib/oles.js',
  name: 'oles'
});

rollup.rollup(config)
  .then(bundle => {
    bundle.write(config.output);
    console.log('build end');
  });