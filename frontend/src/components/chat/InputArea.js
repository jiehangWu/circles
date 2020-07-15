import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";

class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.state = {
            content: "",
        };
    }

    clearAll = () => {
        this.setState({
            content: "",
        });
        this.textArea.current.value = "";
    };

    handleSubmit = () => {
        if (this.state.content) {
            this.props.submitChat(
                {
                    sender: this.props.username,
                    receiver: this.props.currentChatter,
                    content: this.state.content

                });
            this.props.addOneMessage({
                sender: this.props.username,
                receiver: this.props.currentChatter,
                content: this.state.content
            });
            console.log({
                purpose: "CLIENT_SEND_MESSAGE",
                payload: {
                    sender: this.props.username,
                    receiver: this.props.currentChatter,
                    content: this.state.content
                }
            });
            this.clearAll();
        }
    };

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    render() {
        return (
            <Grid container direction="row" alignItems="flex-end">
                <Grid item>
                                <textarea className="text-box ml-2 mr-1 my-1 mt-2"
                                          style={{
                                              width: "500px",
                                              outlineColor: "grey",
                                              outlineWidth: "1px",
                                              backgroundColor: "white"
                                          }}
                                          id="outlined-required"
                                          rows="3"
                                          placeholder="Press Enter to send"
                                          required
                                          onChange={(e) => {
                                              this.handleChange(e)
                                          }}
                                          ref={this.textArea}>
    
                                </textarea>
                </Grid>
                <Grid item>
                    <button type="button"
                            className={"btn btn-primary float-right mx-2 mb-3"
                            + (this.state.content ? "" : " disabled")}
                            onClick={this.handleSubmit}>
                        Submit
                    </button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userinfo.username,
        currentChatter: state.currentChatPerson
    };
};

const mapAction = {
    submitChat: (message) => {
        return {
            type: 'CLIENT_SEND_MESSAGE',
            payload: message
        };
    },
    addOneMessage: (message) => {
        return {
            type: "ADD_ONE_MESSAGE",
            payload: message
        }
    }

};


export default connect(mapStateToProps, mapAction)(InputArea);