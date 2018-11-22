// webpack.config.js
var path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['./test1.js'], // 在 index 檔案後的 .js 副檔名是可選的
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'barrage.js'
  },
	plugins: [
		new webpack.BannerPlugin('Built by pcw player group @' + new Date().toLocaleString()),

		new UglifyJSPlugin({
			sourceMap: true
		})
	]
}