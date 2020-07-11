import React from 'react';
import { connect } from 'react-redux';
import { deleteTag, loadAllTags } from "../../actions/tags.actions";

import Chip from '@material-ui/core/Chip'
import LoyaltyIcon from '@material-ui/icons/Loyalty';

class Tag extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadAllTags(this.props.userId);
    }

    handleDelete = () => {
        console.log(this.props.content);
        this.props.deleteTag(this.props.userId, this.props.content);
    };

    render() {
        return (
            <Chip size="medium"
                label={this.props.content}
                onDelete={this.handleDelete}
                color="primary"
                icon={<LoyaltyIcon />}> </Chip>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        input: state.input,
        userId: state.userinfo.userId,
        tags: state.userinfo.tags
    };
};

export default connect(mapStateToProps, { deleteTag, loadAllTags })(Tag);