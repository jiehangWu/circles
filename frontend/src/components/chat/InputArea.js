import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';


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
                {
                    purpose: "CLIENT_SEND_MESSAGE",
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
            <Grid container direction="row" alignItems="flex-start" justify="space-between"
                  style={{position: 'relative', height: 'calc(7vh)'}}>


                <Grid item style={{height: '100%', width: '87%'}} className="ml-2 mr-0 my-2 mt-2 mb-0">
                    <textarea
                        style={{
                            outlineColor: "white",
                            outlineWidth: "1px",
                            backgroundColor: "white",
                            width: '100%',
                            height: 'calc(4vh)'
                        }}
                        id="outlined-required"
                        placeholder="Press Enter to send"
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
                <Grid item style={{
                    height: '100%',
                    width: '9%',
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}>

                    <IconButton aria-label="video chat" style={{alignSelf: 'flex-start', height: '20px', width: '20px'}}
                                onClick={this.handleSubmit
                                }>
                        <SendIcon/>
                    </IconButton>
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
    },
};


export default connect(mapStateToProps, mapAction)(InputArea);