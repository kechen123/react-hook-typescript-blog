import React, { Component } from 'react'
import Lifecycle from './lifecycle'

class App extends Component {
	constructor(props: any) {
		super(props)
	}
	state = {
		flag: true,
		title: '我是app组件的标题',
	}
	//创建/销毁组件
	setFlag() {
		this.setState({
			flag: !this.state.flag,
		})
	}
	//改变title
	setTitle() {
		this.setState({
			title: '我是app组件改变后的title',
		})
	}
	render() {
		return (
			<div className="App">
				{this.state.flag ? <Lifecycle title={this.state.title} /> : ''}
				<button onClick={() => this.setFlag()}>挂载/销毁生命周期函数组件</button>
				<button onClick={() => this.setTitle()}>改变app组件的title</button>
			</div>
		)
	}
}
export default App
