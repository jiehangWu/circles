import React from 'react';
import { connect } from 'react-redux';
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
            let date = Date.now();
            this.props.submitChat(
                {purpose: "CLIENT_SEND_MESSAGE",
                    payload: {
                        sender: {
                            userId: this.props.userId,
                            username: this.props.username,
                            userAvatar: this.props.userAvatar
                        },
                        receiver: this.props.currentChatter,
                        content: this.state.content,
                        date: date
                    }
                });
            this.props.addOneMessage({
                sender: {
                    userId: this.props.userId,
                    username: this.props.username,
                    userAvatar: this.props.userAvatar
                },
                receiver: this.props.currentChatter,
                content: this.state.content,
                date: date

            });
            this.props.headContactListSend({...this.props.currentChatter, dateStr: new Date().toUTCString()});
            this.props.headHistoryContactsSend({...this.props.currentChatter, dateStr: new Date().toUTCString()});
            // console.log({
            //     purpose: "CLIENT_SEND_MESSAGE",
            //     payload: {
            //         sender: this.props.username,
            //         receiver: this.props.currentChatter,
            //         content: this.state.content
            //     }
            // });
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
            <Grid container direction="row" alignItems="flex-end" justify="space-between" style={{height:'calc(8vh)'}}>
                <Grid item  style = {{height: '100%',width: '90%'}} className="ml-2 mr-1 my-2 mt-2">
                    <textarea
                        style={{
                            outlineColor: "white",
                            outlineWidth: "1px",
                            backgroundColor: "white",
                            width:'100%',
                            height:'calc(6vh)'
                        }}
                        id="outlined-required"
                              placeholder="Press Send to send"
                        required
                        onChange={(e) => {
                            this.handleChange(e)
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.handleSubmit();
                                this.props.chatEnter();
                            }
                        }
                        }
                        ref={this.textArea}>
                    </textarea>
                </Grid>
                <Grid item style = {{height: '100%',width: '8%', display: "flex", flexDirection: 'row', alignItems:'flex-end'}}>
                    <button type="button"
                        className={"btn btn-default float-right mx-0 mb-3"
                            + (this.state.content ? "" : " disabled")}
                        onClick={this.handleSubmit} style={{color:'#0080FF', fontWeight: 'bold', alignSelf:'flex-end'}}>
                        Send
                    </button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userinfo.userId,
        userAvatar: state.userinfo.avatar,
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
    },
    headContactListSend: (user) => {
        return {
            type: "HEAD_CONTACT_LIST_SEND",
            payload: user
        }
    },
    headHistoryContactsSend: (user) => {
        return {
            type: 'HEAD_HISTORY_CONTACT_LIST',
            payload: user
        }
    },
    chatEnter: () => {
        return {
            type: "CHAT_ENTER"
        }
    }
}


export default connect(mapStateToProps, mapAction)(InputArea);