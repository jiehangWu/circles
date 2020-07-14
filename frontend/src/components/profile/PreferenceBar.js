import React from 'react';
import { connect } from 'react-redux';
import { addTag, addTagSuccess, loadAllTags } from "../../actions/tags.actions";
import Card from '@material-ui/core/Card';


const styles = {
    textBox: {
        width: "95%",
        border: '0',
    },

    container: {
        width: "36%",
        height: "18%",
        border: '0',
        padding: '10px',
        backgroundColor: 'transparent'
    }
}

class PreferenceBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.textArea = React.createRef();
        this.state = {
            content: "",
        }
    }

    clearAll = () => {
        this.setState({
            content: "",
        });
        this.textArea.current.value = "";
    }

    handleAdd = () => {
        if (this.state.content) {
            this.props.addTag(this.props.userId, this.state.content);
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
            <div className="container" style = {styles.container}>
                {/* {this.componentDidMount()} */}
                <Card>
                    <div className={"DisplayTags"} >

                        <textarea className="text-box mx-2 mt-3"
                            style={styles.textBox}
                            rows="2"
                            placeholder="Which tags can represent you?"
                            requiredvalue={this.props.input}
                            onChange={this.handleChange}
                            ref={this.textArea} />

                        <button type="button"
                            className={"btn btn-primary float-right mx-4 mb-3"
                                + (this.props.input ? "" : " disabled")}
                            onClick={() => { this.handleAdd(); this.componentDidMount() }}>Add Tag
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

