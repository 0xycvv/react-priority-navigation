import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json';

export default {
  entry: './src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  external: ['react'].concat(Object.keys(pkg.dependencies)),
	plugins: [
    typescript(/*{ plugin options }*/),
    resolve(),
    postcss(),
    commonjs()
	]
}
