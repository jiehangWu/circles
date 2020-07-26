import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Message from "./message";
import {HomeActions} from "../../actions/home.actions";
import {ChatActions} from "../../actions/chat.actions";


export function ChatDisplayPort(props) {
    let messagesEnd;
    useEffect(() => {
        props.loadChats();
        scrollToBottom();
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
        });
    },[]);

    useEffect(() => {
        scrollToBottom();
        },[props.chatsReducer1, props.person.userId]);


    let scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    return <React.Fragment>

            <div style={{height: "calc(86vh)", padding: "10px", margin: "0px", overflow: "scroll"}}>
                {props.chatsReducer1[props.person.userId] ?
                    props.chatsReducer1[props.person.userId].map((ele) => {
                        if (ele.sender.username === props.username) {
                            return <Message content={ele.content} chatter={ele.sender} left={false}/>
                        } else
                            return <Message content={ele.content} chatter={ele.sender} left={true}/>;
                    }) : <div></div>
                }
                <div>

                </div>
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
        person: state.currentChatPerson
    };
};

const mapAction = {

    loadChats: ChatActions.loadChats,

};

export default connect(mapStateToProps, mapAction)(ChatDisplayPort);