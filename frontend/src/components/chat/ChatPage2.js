import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import InputArea from "./InputArea";
import {HomeActions} from "../../actions/home.actions";
import ChatDisplayPort from "./ChatDisplayPort";
import ChatPanel from "./ChatPanel";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {history} from "../../helpers/history";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import VideoPort from "./VideoPort";
import VideocamIcon from "@material-ui/icons/Videocam";
import VoiceChatIcon from '@material-ui/icons/VoiceChat';

export function ChatPage2(props) {
    const [trans, setTrans] = useState(0);

    useEffect(()=> {
        setTrans(props.inChat);
        },[props.inChat]);

    let handleVideoChat = ()=> {
        props.applyVideoChat({purpose: "CLIENT_APPLY_VIDEO_CHAT",
            payload: {
                sender: {
                    userId: props.userId,
                    username: props.username,
                },
                receiver: props.currentChatter,
            }
        });
        props.waitVideo();
        props.chatApply(props.currentChatter);
        props.chatCaller();
    }

    return <React.Fragment>
        <div style = {{width: '90%'}}>
            {
                props.chatVideoStatus?<VideoPort/>:null
            }
            {props.screenHeight/props.screenWidth < 1.3 || props.screenWidth < 800?
                <Grid container direction="row" alignItems="flex-start" style={{width: '100%'}}>
                    <Grid item className="" style={
                        {marginLeft: '1%', width: '29%'}
                    }>
                        <Paper style={{background: "white"}}>
                            <ChatPanel/>
                        </Paper>
                    </Grid>

                    < Grid item className="" style={
                        {marginLeft: '1%', width: '69%',position:'relative'}
                    }>
                        <IconButton aria-label="video chat"
                                    style={{height: '30px', width:'30px',position:'absolute',right:'2%',top:'0%',zIndex:"9999"}}  onClick={()=>{handleVideoChat()}
                        }>
                            <VideocamIcon fontSize='large'/>
                        </IconButton>
                        <Paper style={{background: "white"}}>
                            <ChatDisplayPort/>
                        </Paper>
                        <Paper className="" style={{background: "#F5F5F5"}}>
                            <InputArea/>
                        </Paper>
                    </Grid>
                </Grid>:
                <div>

                    <div>
                        <Route exact path="/home/chat" >
                    <div className="" style={
                        {marginLeft: '1%', width: '100%'}
                    }>
                        <Paper style={{background: "white"}}>
                            <ChatPanel/>
                        </Paper>
                    </div>
                        </Route>

                        <Route path="/home/chat/messages" >
                    < div style={
                        {marginLeft: '1%', width: '100%',height: '100%', position:'relative'}
                    }>
                        <IconButton aria-label="video chat"  style={{position:'absolute', zIndex:'999',height: '35px', width:'35px'}}  onClick={()=> {
                            history.push('/home/chat');
                            props.leaveChat();
                        }}>
                            <KeyboardReturnIcon fontSize="large"/>
                        </IconButton>
                        <IconButton aria-label="video chat"
                                    style={{height: '30px', width:'30px',position:'absolute',right:'2%',top:'0%',zIndex:"9999"}}  onClick={()=>{handleVideoChat()}
                        }>
                            <VideocamIcon fontSize='large'/>
                        </IconButton>
                        <Paper style={{background: "white"}}>
                            <ChatDisplayPort/>
                        </Paper>
                        <Paper className="" style={{background: "#F5F5F5"}}>
                            <InputArea/>
                        </Paper>
                    </div>
                            </Route>

                    </div>
                </div>
            }
        </div>
    </React.Fragment>
}

const mapStateToProps = (state) => {
    return {
        chats: state.chats,
        person: state.currentChatPerson,
        username: state.userinfo.username,
        screenWidth: state.screenWidth,
        screenHeight:state.screenHeight,
        inChat: state.inChat,
        chatVideoStatus: state.chatVideoStatus,
        chatsReducer1: state.chatsReducer1,
        userAvatar: state.userinfo.avatar,
        chatEnter: state.chatEnter,
        userId: state.userinfo.userId,
        currentChatter: state.currentChatPerson
    };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
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
    },
    leaveChat: ()=> {
        return {
            type:'LEAVE_CHAT',
        }
    }
};

export default connect(mapStateToProps, mapAction)(ChatPage2);