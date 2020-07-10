import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { selectToggleTag } from "../../actions";
=======
import {selectToggleTag} from '../../actions';
>>>>>>> origin/develop-wjh

// constructor:
// tagDetails: {tag: String, selected: Bool}
// tagIndex: Number
// text: from DisplayTagsArea component

<<<<<<< HEAD
class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
=======
class Tag extends React.Component{
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
>>>>>>> origin/develop-wjh

	handleClick() {
		this.props.selectToggleTag(this.props.tagIndex);
	}


<<<<<<< HEAD
    render() {
        return <span onClick={this.handleClick}>
            {this.props.tagDetails.tag}</span>;
    }
=======
	render() {
		return <span onClick={this.handleClick}>
			{this.props.tagDetails.tag}</span>;
	}
>>>>>>> origin/develop-wjh
}

export default connect(null, { selectToggleTag })(Tag);