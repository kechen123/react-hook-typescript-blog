import React, { useState, useEffect } from 'react'
import '../less/codeCss.less'
import print from '../components/codePrinter/index.js'

const Index = () => {
	useEffect(() => {
		print('../src/pages/index.tsx', 16)
	}, [])
	return ''
}
export default Index
