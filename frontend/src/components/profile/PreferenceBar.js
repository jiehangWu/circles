import React from 'react';
import { connect } from 'react-redux';
import { addTag, addTagSuccess, loadAllTags } from "../../actions/tags.actions";
import Card from '@material-ui/core/Card';
import "./tagCard.css";

class PreferenceBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.textArea = React.createRef();
        this.state = {
            content: "",
        }
    }

    componentDidMount() {
        this.props.loadAllTags(this.props.userId);
    }

    clearAll = () => {
        this.setState({
            content: "",
        });
        this.textArea.current.value = "";
    }

    handleAdd = () => {
        // console.log("userid" + this.props.userId);
        if (this.state.content) {
            this.props.addTag(this.props.userId, this.state.content);
            //TODO: delete and fix server response
            this.props.addTagSuccess(this.state.content);
        }
        this.clearAll();
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    render() {
        return (
            <div className={"Container"}>
                <Card>
                    <div className={"DisplayTags"}>

                        <textarea className="text-box mx-2 mt-3"
                            rows="2"
                            placeholder="Which tags can represent you?"
                            requiredvalue={this.props.input}
                            onChange={this.handleChange}
                            ref={this.textArea} />

                        <button type="button"
                            className={"btn btn-primary float-right mx-4 mb-3"
                                + (this.props.input ? "" : " disabled")}
                            onClick={this.handleAdd}>Add Tag
                    </button>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        input: state.input,
        userId: state.userinfo.userId,
        tags: state.userinfo.tags
    };
};

export default connect(mapStateToProps, { addTag, addTagSuccess, loadAllTags })(PreferenceBar);

