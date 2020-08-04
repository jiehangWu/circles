import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Message from "./message";
import {ChatActions} from "../../actions/chat.actions";
import {isAndroid,isIOS} from 'react-device-detect';

export function ChatDisplayPort(props) {
    let messagesEnd;
    const [pop, setPop] = useState(0);

    useEffect(() => {
        props.loadChats(props.userId);

        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [props.chatsReducer1, props.person.userId, props.chatVideoStatus]);

    useEffect(() => {
        setTimeout(() => {
            if (messagesEnd) scrollToBottom()
        }, 100);
    }, [props.chatEnter]);


    useEffect(() => {
        setTimeout(() => {
            setPop(props.mobileKeyboardPop);
            }, 100);
        }, [props.mobileKeyboardPop]);

    let scrollToBottom = () => {
        messagesEnd.scrollIntoView({behavior: "smooth"});

    };

    let i = 0;
    const generateKey = (ele) => {
        return i++;
    };

    return <React.Fragment>
        <div style={(isIOS || isAndroid)&& pop && (props.screenHeight / props.screenWidth >= 1.25 || props.screenWidth) < 800?{
            maxHeight:'calc(40vh)',
            minHeight:'calc(40vh)',
            position: 'relative',
            padding: "10px",
            paddingTop: '20px',
            margin: "0px",
            overflow: "scroll"
        }:{
            height: "calc(76vh)",
            position: 'relative',
            padding: "10px",
            paddingTop: '20px',
            margin: "0px",
            overflow: "scroll"}}>

            {props.chatsReducer1[props.person.userId] ?
                props.chatsReducer1[props.person.userId].map((ele) => {
                    if (ele.sender.username === props.username) {
                        ele.sender.userAvatar = props.userAvatar;
                        return <Message content={ele.content} chatter={ele.sender} left={false} key={generateKey(ele)}/>
                    } else {
                        ele.sender.userAvatar = props.person.userAvatar;
                        return <Message content={ele.content} chatter={ele.sender} left={true} key={generateKey(ele)}/>;
                    }
                }) : <div></div>
            }
            <div style={{float: "left", clear: "both"}}
                 ref={(el) => {
                     messagesEnd = el;
                 }}>
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
        chatVideoStatus: state.chatVideoStatus,
        userId: state.userinfo.userId,
        currentChatter: state.currentChatPerson,
        mobileKeyboardPop:state.mobileKeyboard,
        screenWidth:state.screenWidth,
        screenHeight:state.screenHeight
    };
};

const mapAction = {
    loadChats: ChatActions.loadChats,

};

export default connect(mapStateToProps, mapAction)(ChatDisplayPort);