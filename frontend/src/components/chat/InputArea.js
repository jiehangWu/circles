import React from 'react';
import Card from "@material-ui/core/Card";
import {submitChatMessage } from '../../actions/chat.actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

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
    }

    handleSubmit = () => {
        if (this.state.content) {
            this.props.submitChatMessage(
                this.state.content,
                new Date()
            );
            this.clearAll();
        }
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    render() {
        return (
            <div className="container">
                <Card className="input-area my-3">
                    <div className="row">
                  
                        <div className="col-lg-10">
                                <textarea className="text-box mx-2 mt-3"
                                          rows="3"
                                          placeholder="Press Enter to send"
                                          required
                                          onChange={(e) => {this.handleChange(e)}}
                                          ref={this.textArea}>
    
                                </textarea>

                            <button type="button" 
                                    className={"btn btn-primary float-right mx-4 mb-3" 
                                        + (this.state.content ? "" : " disabled")} 
                                    onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userinfo.userId
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
         {
              submitChatMessage
         },
         dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputArea);