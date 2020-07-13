import React from 'react';
import { connect } from 'react-redux';
import { loadAllTags } from "../../actions/tags.actions";
import Tag from "./Tag";

class DisplayTagArea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.loadAllTags(this.props.currID);
    }

    render() {
        // console.log("from superior component", this.props.profileTags);
        // const profileTags = this.props.profileTags;
        return (
            <div>
                {this.props.tags.map((content) =>
                    <Tag
                        content={content}
                        key = {content} />
                )}
 
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags,
        userId: state.userinfo.userId,
    };
};

export default connect(mapStateToProps, { loadAllTags })(DisplayTagArea);