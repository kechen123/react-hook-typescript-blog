import Mock from 'mockjs'
var blog = Mock.mock(/^\/(ke)\/blog(.*)/, 'get', {
	//"/mock"是通过ajax获取数据时填写的地址，可以随意写。但要和ajax请求时填写的地址一致。
	'data|4': [
		{
			//生成四个如下格式的数据
			'id|+1': 1, //数字从1开始，后续依次加1
			name: '@cname', //名字为随机中文名
			'age|18-28': 25, //年龄是18-28之间的随机数
			'sex|1': ['男', '女'], //性别是数组里的随机一项
			title: 'React Hooks 源码解析（1）：类组件、函数组件、纯组件',
			'job|1': ['web', 'teacher', 'python', 'php'], //job是数组里的随机一项
			introduction:
				'React 源码版本: v16.9.0根据 React 官网，React 中的组件可分为函数式组件（Functional Component）与类组件（Class Component）。是一个很好的解决办法，我用这个办法解决了很多的问题呢！！！',
			create_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
			'comment_count|1-28': 16,
		},
	],
	code: 200,
})
export default blog
