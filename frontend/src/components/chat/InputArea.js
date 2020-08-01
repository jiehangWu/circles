import React from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import VideocamIcon from '@material-ui/icons/Videocam';

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

    handleVideoChat = ()=> {
        this.props.applyVideoChat({purpose: "CLIENT_APPLY_VIDEO_CHAT",
            payload: {
                sender: {
                    userId: this.props.userId,
                    username: this.props.username,
                },
                receiver: this.props.currentChatter,
            }
        });
        console.log("HANDLE VIDEO CHAT");
        this.props.waitVideo();
        this.props.chatApply(this.props.currentChatter);
        this.props.chatCaller();
    }

    render() {
        return (
            <Grid container direction="row" alignItems="flex-start" justify="space-between" style={{height:'calc(11vh)'}}>
                <Grid item  style = {{height: '100%',width: '85%'}} className="ml-2 mr-0 my-2 mt-2">
                    <textarea
                        style={{
                            outlineColor: "white",
                            outlineWidth: "1px",
                            backgroundColor: "white",
                            width:'100%',
                            height:'calc(7vh)'
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
                <Grid item style = {{height: '100%',width: '10%', display: "flex", flexDirection: 'column', alignItems:'flex-end',justifyContent:'flex-start'}}>
                    <IconButton aria-label="video chat"  style={{alignSelf: 'flex-start', height: '35px', width:'35px'}}  onClick={this.handleVideoChat
                    }>
                        <VideocamIcon />
                    </IconButton>

                    <button type="button"
                        className={"btn btn-default btn-sm float-right mx-0 mb-0"
                            + (this.state.content ? "" : " disabled")}
                        onClick={this.handleSubmit} style={{color:'#0080FF', fontWeight: 'bold', alignSelf:'flex-start'}} >
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
    },
    applyVideoChat: (info)=> {
        return{
            type: 'CLIENT_APPLY_VIDEO_CHAT',
            payload: info
        }
    },
    waitVideo: ()=> {
        return{
            type:'WAIT_VIDEO',
        }
    },
    chatApply: (receiver) => {
        return {
            type: 'CHAT_APPLY',
            payload: receiver
        }
    },
    chatCaller: ()=> {
        return{
            type:'CALLER',
        }
    }
}


export default connect(mapStateToProps, mapAction)(InputArea);