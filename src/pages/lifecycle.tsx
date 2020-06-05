import React, { Component } from 'react'
interface IProps {
	title: string
}
class Lifecycle extends Component<IProps> {
	public constructor(props: IProps) {
		super(props)
	}
	state = {
		msg: '我是一个msg数据',
		title: this.props.title,
	}
	//组件将要挂载时候触发的生命周期函数
	componentWillMount() {
		console.log('02组件将要挂载')
	}
	//组件挂载完成时候触发的生命周期函数
	componentDidMount() {
		//Dom操作，请求数据放在这个里面
		console.log('04组件挂载完成')
	}
	//是否要更新数据，如果返回true才会更新数据
	shouldComponentUpdate(nextProps: any, nextState: any) {
		console.log('01是否要更新数据')
		console.log(nextProps) //父组件传给子组件的值，这里没有会显示空
		console.log(nextState) //数据更新后的值
		return true //返回true，确认更新
	}
	//将要更新数据的时候触发的
	componentWillUpdate() {
		console.log('02组件将要更新')
	}
	//更新数据时候触发的生命周期函数
	componentDidUpdate() {
		console.log('04组件更新完成')
	}
	//你在父组件里面改变props传值的时候触发的函数
	componentWillReceiveProps() {
		console.log('父子组件传值，父组件里面改变了props的值触发的方法')
	}
	setMsg() {
		this.setState({
			msg: '我是改变后的msg数据',
		})
	}
	//组件将要销毁的时候触发的生命周期函数，用在组件销毁的时候执行操作
	componentWillUnmount() {
		console.log('组件销毁了')
	}
	render() {
		console.log('03数据渲染render')
		return (
			<div style={{ marginTop: '200px' }}>
				生命周期函数演示--{this.state.msg}--{this.props.title}
				<br />
				<hr />
				<button onClick={() => this.setMsg()}>更新msg的数据</button>
			</div>
		)
	}
}
export default Lifecycle
