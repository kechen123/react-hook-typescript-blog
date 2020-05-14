const {
	override,
	addWebpackAlias,
	addLessLoader
} = require('customize-cra');
const path = require("path");

//不暴露（eject）webpack配置的情况下使用less，alias别名
module.exports = override()(
	addLessLoader(),

	//无效，链接：https://github.com/arackaf/customize-cra/issues/207
	addWebpackAlias({
		"@pages": path.resolve(__dirname, "./src/pages"),
	}),
);