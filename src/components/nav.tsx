import React, { Component } from 'react'
import { throttle } from '@common/util'
import Title from '@components/title'
const DELTA = 5

class Nav extends Component {
	public constructor(props: any) {
		super(props)
	}
	state = {
		isMounted: false,
		menuOpen: false,
		scrollDirection: 'none',
		lastScrollTop: 0,
		firstPageEnd: false,
	}
	//组件挂载完成时候触发的生命周期函数
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, true)
		setTimeout(
			() =>
				this.setState({ isMounted: true }, () => {
					console.log('监听scroll>>>>>>>>>')
					window.addEventListener(
						'scroll',
						() => {
							console.log('scroll-------')
							throttle(this.handleScroll())
						},
						true
					)
				}),
			100
		)
	}
	setFirstPageEnd = (param: boolean) => {
		this.setState({ firstPageEnd: param })
	}
	handleScroll = () => {
		const { isMounted, menuOpen, scrollDirection, lastScrollTop } = this.state
		const fromTop = window.scrollY
		// Make sure they scroll more than DELTA
		console.log('scroll>>>>>>' + fromTop, lastScrollTop)
		if (!isMounted || Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
			return
		}

		if (fromTop < DELTA) {
			console.log('none>>>>>>>>>>>>')
			this.setState({ scrollDirection: 'none' })
		} else if (fromTop > lastScrollTop && fromTop > 90) {
			if (scrollDirection !== 'down') {
				console.log('down>>>>>>>>>>>>')
				this.setState({ scrollDirection: 'down' })
			}
		} else if (fromTop + window.innerHeight < document.body.scrollHeight) {
			if (scrollDirection !== 'up') {
				console.log('up>>>>>>>>>>>>')
				this.setState({ scrollDirection: 'up' })
			}
		}

		this.setState({ lastScrollTop: fromTop, firstPageEnd: true })
	}

	//组件将要销毁的时候触发的生命周期函数，用在组件销毁的时候执行操作
	componentWillUnmount() {
		console.log('组件销毁了')
	}
	render() {
		console.log('03数据渲染render')
		return (
			<Title
				scrollDirection={this.state.scrollDirection}
				firstPageEnd={this.state.firstPageEnd}
				setFirstPageEnd={this.setFirstPageEnd}
			/>
		)
	}
}
export default Nav
