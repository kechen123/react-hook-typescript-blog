import React, { Component } from 'react'
import { throttle } from '@common/util'
import Title from '@components/title'
const DELTA = 10

class Nav extends Component {
	public constructor(props: any) {
		super(props)
	}
	state = {
		isMounted: false,
		menuOpen: false,
		scrollDirection: 'none',
		lastScrollTop: 0,
		chengedirection: false,
		firstPageEnd: false,
	}
	//组件挂载完成时候触发的生命周期函数
	componentDidMount() {
		setTimeout(
			() =>
				this.setState({ isMounted: true }, () => {
					window.addEventListener(
						'scroll',
						() => {
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
		if (!isMounted || Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
			return
		}
		if (fromTop < DELTA) {
			this.setState({
				scrollDirection: 'none',
				chengedirection: true,
				lastScrollTop: fromTop,
				firstPageEnd: true,
			})
		} else if (fromTop > lastScrollTop && fromTop > 90 && scrollDirection !== 'down') {
			this.setState({
				scrollDirection: 'down',
				chengedirection: true,
				lastScrollTop: fromTop,
				firstPageEnd: true,
			})
		} else if (fromTop < lastScrollTop && scrollDirection !== 'up') {
			this.setState({ scrollDirection: 'up', chengedirection: true, lastScrollTop: fromTop, firstPageEnd: true })
		} else {
			this.setState({ chengedirection: false, lastScrollTop: fromTop, firstPageEnd: true })
		}
	}
	//是否要更新数据，如果返回true才会更新数据
	shouldComponentUpdate(nextProps: any, nextState: any) {
		if (nextState.chengedirection) {
			return true //返回true，确认更新
		}
		return false
	}
	//组件将要销毁的时候触发的生命周期函数，用在组件销毁的时候执行操作
	componentWillUnmount() {
		window.removeEventListener('scroll', () => this.handleScroll())
	}
	render() {
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
