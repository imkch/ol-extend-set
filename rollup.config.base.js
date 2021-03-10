const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve');

const external = [
  'ol',
  'ol/layer',
  'ol/source',
  'ol/proj',
  'proj4'
];
const globals = {
  'ol': 'ol',
  'ol/layer': 'ol.layer',
  'ol/source': 'ol.source',
  'ol/proj': 'ol.proj',
  'proj4': 'proj4'
}
module.exports = {
  input: '',
  output: {
    file: '',
    format: 'umd',
    extend: false,
    globals
  },
  external,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
  ]
};