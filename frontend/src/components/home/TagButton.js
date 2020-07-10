import React from 'react';
import { connect } from 'react-redux';
import {addTag, deleteTag} from '../../actions';

// constructor: name, funcName
class Button extends React.Component {
	constructor(props) {
		super(props);
		this.func = this.func.bind(this);
	}

	func(funcName) {
		switch (funcName) {
		case ('addTag'):
			return this.props.addTag(this.props.input);
		case('deleteTag'):
			return this.props.deleteTag(this.props.tagIndex);
		default:
			return this.props.addTag('');
		}
	}


	render() {
		return (<button onClick= {() =>this.func(this.props.funcName)}>
			{this.props.name}
		</button>
		);
	}
}

const mapStateToProps = (state) => {
	return {input: state.input,
		tags: state.tags
	};
};

export default connect(mapStateToProps, {addTag, deleteTag})(Button);