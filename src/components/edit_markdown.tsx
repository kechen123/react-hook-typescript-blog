import React from 'react'
import showdown from 'showdown'
import '../assets/less/edit_markdown.less'
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
const converter = new showdown.Converter(options)

const EditMarkDown = (props: any) => {
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
				<div className="showContent" dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.text) }}></div>
			</div>
		</div>
	)
}
export default EditMarkDown
