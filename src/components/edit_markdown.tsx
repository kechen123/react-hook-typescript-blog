import React from 'react'
import showdown from 'showdown'
import 'highlight.js/styles/vs2015.css'
import showdownHighlight from 'showdown-highlight'

import styles from '@less/edit_markdown.module.less'
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
		<div className={styles.editBody}>
			<div className={styles.edit}>
				<textarea
					className={styles.editContent}
					defaultValue={props.text}
					name="message"
					onBlur={(ev) => {
						props.setText(ev.target.value)
					}}
				></textarea>
			</div>

			<div className={styles.show}>
				<div
					className={`${styles.showContent} ${styles.markdown}`}
					dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.text) }}
				></div>
			</div>
		</div>
	)
}
export default EditMarkDown
