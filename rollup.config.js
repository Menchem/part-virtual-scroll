import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import simplevars from 'postcss-simple-vars';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/js/bundle.js',
    format: 'es',
  },
  plugins: [
    json(),
    postcss({
      plugins: [
        simplevars(),
      ],
      extensions: ['.css'],
    }),
  ],
  watch: {
    include: 'src/**',
  },
};
