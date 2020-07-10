import React from 'react';
import { connect } from 'react-redux';
import Tag from "./Tag";

class DisplayTagArea extends React.Component {
    constructor(props) {
        super(props);
        this.createTags = this.createTags.bind(this);
    }

    createTags() {
        let ret = [];
        let arr = this.props.tags.slice();
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            let details = { tag: arr[i].tag, selected: arr[i].selected, color: arr[i].color };
            let selectedStatus = arr[i].selected ? "selectedTag" : "";
            ret.push(<span style={arr[i].selected ? { background: arr[i].color } : {}}
                className={"tagItem " + selectedStatus} key={i}>
                <Tag tagDetails={{ ...details }} tagIndex={i}
                /></span>);
        }
        return ret;
    }

    render() {
        return (<div>
            {
                this.createTags()
            }

        </div>);
    }
}

const mapStateToProps = (state) => {
    return { tags: state.tags };
};

export default connect(mapStateToProps)(DisplayTagArea);