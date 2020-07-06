import Mock from 'mockjs'
import txt from './blogdetail'
var blog = Mock.mock(/^\/(ke)\/blog(.*)/, 'get', {
	//"/mock"是通过ajax获取数据时填写的地址，可以随意写。但要和ajax请求时填写的地址一致。
	'data|6': [
		{
			//生成四个如下格式的数据
			'id|+1': 1, //数字从1开始，后续依次加1
			name: '@cname', //名字为随机中文名
			'age|18-28': 25, //年龄是18-28之间的随机数
			'sex|1': ['男', '女'], //性别是数组里的随机一项
			'title|+1': '@csentence()',
			'job|1': ['web', 'teacher', 'python', 'php'], //job是数组里的随机一项
			introduction: '@cparagraph()',
			content: txt,
			create_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
			'comment_count|1-28': 16,
		},
	],
	pageNum: 17,
	count: 6,
	code: 200,
})
var blogDetail = Mock.mock(/^\/(ke)\/detail_blog(.*)/, 'get', {
	data: {
		title: '@csentence()',
		content: txt,
		'tags|1': [
			{
				icon: 'iconjava-script',
				id: '1',
				name: 'javascript',
			},
			{
				icon: 'iconVue',
				id: '3',
				name: 'vue.js',
			},
			{
				icon: 'iconCSS',
				id: '4',
				name: 'css',
			},
			{
				icon: 'iconHTML',
				id: '6',
				name: 'html5',
			},
		],
		'comment_count|1-28': 16,
		'read|1-200': 10,
		create_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
	},
	code: 200,
})
export default {
	blog,
	blogDetail,
}
