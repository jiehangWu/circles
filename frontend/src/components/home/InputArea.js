import React from 'react';

let InputArea = () => {
	let input
	return (
		<div id="addArea" className="panel">
		<h2>How do you feel today</h2>

		<form
		onSubmit={e => {
			e.preventDefault()
			if (!input.value.trim()) {
				return
			}
			input.value = ''
		}}
		>

		<textarea ref={node => {input = node
		}}
		className="textinput"
		/>

		<button type="submit" className="inputPanel">Share</button>

		</form>
		</div>
	)
}


export default InputArea;