import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import {isAndroid,isIOS} from 'react-device-detect';

class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.state = {
            content: "",
            originHeight:0
        };
        this.androidUpdateKeyboard = this.androidUpdateKeyboard.bind(this);
        this.iosFocus = this.iosFocus.bind(this);
        this.iosBlur = this.iosBlur.bind(this);
    }

    componentDidMount() {
        if(isIOS) {
            console.log('IOS');
            this.textArea.current.addEventListener('focus', this.iosFocus, false);
            this.textArea.current.addEventListener('blur', this.iosBlur, false);

        }
        if (isAndroid) {
            console.log('ANDROID');
            this.setState({originHeight: document.documentElement.clientHeight || document.body.clientHeight});
            window.addEventListener('resize', this.androidUpdateKeyboard, false);
        }
    }

    componentWillUnmount() {
        if(isAndroid) {
            window.removeEventListener("resize", this.androidUpdateKeyboard);
        }
        if(isIOS) {
            this.textArea.current.removeEventListener('focus', this.iosFocus);
            this.textArea.current.removeEventListener('blur', this.iosBlur);
        }
    }

    androidUpdateKeyboard() {
        const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (resizeHeight < this.state.originHeight) {
            this.props.keyBoardUp();
        } else {
            this.props.keyBoardDown();
        }
    }

    iosFocus() {
        this.props.keyBoardUp();
    }

    iosBlur() {
        this.props.keyBoardDown();
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
        currentChatter: state.currentChatPerson,
        isAndroid: state.isAndroid,
        isIOS:state.isIOS,
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
    keyBoardUp: ()=> {
        return {
            type: 'KEYBOARD_UP'
        }
    },
    keyBoardDown: ()=> {
        return {
            type: 'KEYBOARD_DOWN'
        }
    }

};


export default connect(mapStateToProps, mapAction)(InputArea);