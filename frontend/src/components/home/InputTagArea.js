import React from 'react';
import { connect } from 'react-redux';
import {inputTag} from './actions';


class InputTagArea extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.inputTag(event.target.value);
    }

    render() {
        return (
            <textarea value={this.props.input} onChange={this.handleChange} />
        );
    }
}

const mapStateToProps = (state) => {
    return {input: state.input};
};

export default connect(mapStateToProps, {inputTag})(InputTagArea);