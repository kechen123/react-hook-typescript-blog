import React from 'react'
import showdown from 'showdown'
import 'highlight.js/styles/vs2015.css'
import showdownHighlight from 'showdown-highlight'

import '@less/edit_markdown.less'
const options = {
	omitExtraWLInCodeBlocks: true,
	noHeaderId: true,
	parseImgDimensions: true,
	simplifiedAutoLink: true,
	excludeTrailingPunctuationFromURLs: true,
	literalMidWordUnderscores: true,
	tables: true,
	tasklists: true,
	strikethrough: true,
}

const EditMarkDown = (props: any) => {
	let converter = new showdown.Converter({
		extensions: [showdownHighlight],
	})

	let html = converter.makeHtml(props.text)
	return (
		<div className="editBody">
			<div className="edit">
				<textarea
					className="editContent"
					defaultValue={props.text}
					name="message"
					onBlur={(ev) => {
						props.setText(ev.target.value)
					}}
				></textarea>
			</div>

			<div className="show">
				<div
					className="showContent markdown"
					dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.text) }}
				></div>
			</div>
		</div>
	)
}
export default EditMarkDown
