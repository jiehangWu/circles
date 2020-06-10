import React from 'react';
import { connect } from 'react-redux';
import {selectToggleTag} from "./actions";

// constructor:
// tagDetails: {tag: String, selected: Bool}
// tagIndex: Number
// text: from DisplayTagsArea component

class Tag extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.selectToggleTag(this.props.tagIndex);
    }


    render() {
        return <span onClick={this.handleClick}>
                {this.props.tagDetails.tag}</span>;
    }
}

export default connect(null, {selectToggleTag})(Tag);