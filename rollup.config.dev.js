const rollup = require('rollup');
const css = require('rollup-plugin-css-porter');

const config = require('./rollup.config.base.js');

config.input = 'src/index.js';
Object.assign(config.output, {
  file: 'docs/.vuepress/public/demo/oles/index.js',
  name: 'oles'
});
config.plugins.push(
  css({
    raw: 'docs/.vuepress/public/demo/oles/index.css',
    minified: false
  })
);
rollup.rollup(config)
  .then(bundle => {
    bundle.write(config.output);
    console.log('build end');
  });