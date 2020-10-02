import Mock from 'mockjs'
var menu = Mock.mock(/^\/(ke)\/menu(.*)/, 'get', {
	//"/mock"是通过ajax获取数据时填写的地址，可以随意写。但要和ajax请求时填写的地址一致。
	data: [
		{
			id: 1,
			url: '/common/canvas',
			name: 'canvas特效1',
			children: [
				{
					id: 2,
					url: '/common/trigonometric',
					name: '第一个特效11',
				},
				{
					id: 3,
					url: '/common/canvas/3',
					name: '第一个特效111',
				},
				{
					id: 4,
					url: '/common/canvas/4',
					name: '第一个特效1111',
				},
			],
		},
		{
			id: 11,
			url: '/common/canvas',
			name: 'canvas特效2',
			children: [
				{
					id: 5,
					url: '/common/canvas/122',
					name: '第一个特效22',
				},
				{
					id: 6,
					url: '/common/canvas/222',
					name: '第一个特效222',
				},
				{
					id: 7,
					url: '/common/canvas/1',
					name: '第一个特效2222',
				},
			],
		},
		{
			id: 111,
			url: '/common/canvas',
			name: 'canvas特效3',
			children: [
				{
					id: 8,
					url: '/common/canvas/1',
					name: '第一个特效33',
				},
				{
					id: 9,
					url: '/common/canvas/1',
					name: '第一个特效333',
				},
				{
					id: 10,
					url: '/common/canvas/1',
					name: '第一个特效3333',
				},
			],
		},
	],
	pageNum: 17,
	count: 6,
	code: 200,
})
export default {
	menu,
}
