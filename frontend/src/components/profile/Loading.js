import React from 'react';
import './loading.css';

class Loading extends React.Component {
	render() {
		return (
			<div id="loadingGif" 
				ref = {this.props.reference}>
			</div>
		)
	}
}

export default React.forwardRef ((props, ref) => <Loading reference = {ref} />) ;
