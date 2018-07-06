import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json';

export default {
  input: 'dist/index.js',
  output: {
    name: 'ReactPriorityNav',
    file: 'dist/bundle.js',
    format: 'cjs',
    exports: 'named',
  },
  external: ['react'].concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies)),
	plugins: [
    resolve(),
    postcss(),
    commonjs()
	]
}
