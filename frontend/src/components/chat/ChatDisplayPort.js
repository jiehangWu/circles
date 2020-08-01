import React, {useEffect} from "react";
import {connect} from "react-redux";
import Message from "./message";
import {ChatActions} from "../../actions/chat.actions";
import {chatEnter} from "../../reducers/chat.enter";
import VideoPort from './VideoPort';
import {chatVideoStatus} from "../../reducers/chat.videoStatus";

export function ChatDisplayPort(props) {
    let messagesEnd;
    useEffect(() => {
        props.loadChats();

        scrollToBottom();
        },[]);

    useEffect(() => {
        scrollToBottom();
        },[props.chatsReducer1, props.person.userId,props.chatVideoStatus]);

    useEffect(()=> {
        console.log(props.chatEnter);
        setTimeout(()=> {if(messagesEnd)scrollToBottom()}, 100);
    },[props.chatEnter]);

    let scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    return <React.Fragment>
        <div style={{height: "calc(78vh)", padding: "10px", margin: "0px", overflow: "scroll"}}>
            <div style = {props.chatVideoStatus === 0?{visibility:'hidden'}:{}}>
            <VideoPort />
            </div>
                {props.chatsReducer1[props.person.userId] ?
                    props.chatsReducer1[props.person.userId].map((ele) => {
                        if (ele.sender.username === props.username) {
                            ele.sender.userAvatar = props.userAvatar;
                            return <Message content={ele.content} chatter={ele.sender} left={false}/>
                        } else{
                            ele.sender.userAvatar = props.person.userAvatar;
                            return <Message content={ele.content} chatter={ele.sender} left={true}/>;}
                    }) : <div></div>
                }
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { messagesEnd = el; }}>
                </div>
            </div>

    </React.Fragment>

}

const mapStateToProps = (state) => {
    return {
        chatsReducer1: state.chatsReducer1,
        username: state.userinfo.username,
        userAvatar: state.userinfo.avatar,
        person: state.currentChatPerson,
        chatEnter: state.chatEnter,
        chatVideoStatus: state.chatVideoStatus
    };
};

const mapAction = {
    loadChats: ChatActions.loadChats,
};

export default connect(mapStateToProps, mapAction)(ChatDisplayPort);