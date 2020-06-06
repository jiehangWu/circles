import React from 'react';

let InputArea = () => {
	let input
	return (
		<div id="addArea" className="panel">
		<center><h2>Please Type in Below</h2></center>
		<br /><br />

		<form
		onSubmit={e => {
			e.preventDefault()
			if (!input.value.trim()) {
				return
			}
			// dispatch(addMsg(input.value))
			input.value = ''
		}}
		>

		<textarea ref={node => {input = node
		}}
		className="textinput"
		/>

		<button type="submit" className="inputPanel">Add</button>

		</form>
		</div>
	)
}


export default InputArea;