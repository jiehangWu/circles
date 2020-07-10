import React from 'react';
import { connect } from 'react-redux';
import { deleteTag } from "../../actions/tags.actions";

import Chip from '@material-ui/core/Chip'
import LoyaltyIcon from '@material-ui/icons/Loyalty';

class Tag extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDelete = () => {
        this.props.deleteTag(this.props.tagIndex);
    };

    render() {
        return <Chip size="medium"
            label={this.props.tagDetails.tag}
            onDelete={this.handleDelete}
            color="primary"
            icon={<LoyaltyIcon />}> </Chip>
    }
}

export default connect(null, { deleteTag })(Tag);