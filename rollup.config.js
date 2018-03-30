import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: './src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
	plugins: [
    typescript(/*{ plugin options }*/),
    commonjs()
	]
}
