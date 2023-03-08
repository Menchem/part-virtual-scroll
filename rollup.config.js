import resolve from '@rollup/plugin-node-resolve'; //查找外部模块
import commonjs from '@rollup/plugin-commonjs'; //转为es
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/js/part-scroll.js',
    name: 'PartScroll',
    format: 'umd',
  },
  plugins: [ 
    resolve({browser: true}),
    json(),
    commonjs(),
    postcss(),
    babel({ babelHelpers: 'bundled' })
  ],
};
