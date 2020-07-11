import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import ContactList from "./ContactList";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import InputArea from "./InputArea";
import Message from "./message";
import {HomeActions} from "../../actions/home.actions";
import Contact from "./Contact";

export function ChatDisplayPort(props) {

    return <React.Fragment>
    <Paper style={{background:"white"}}>
        <div style={{width:"600px",height:"400px", padding:"10px", margin:"0px", overflow:"scroll"}} >
            {props.chatsReducer1[props.person]?
                props.chatsReducer1[props.person].map((ele) => {
                    if (ele.sender === props.username) {
                        return <Message content = {ele.content} name = {ele.sender} left = {false}/>
                    }
                    else
                        return <Message content = {ele.content} name = {ele.sender} left = {true}/>;
                }):<div></div>
            }



        </div>
    </Paper>
    </React.Fragment>

}

const mapStateToProps = (state) => {
    return {
        chatsReducer1: state.chatsReducer1,
        username:state.userinfo.username,
        person: state.currentChatPerson
    };
};

const mapAction = {
    loadHome: HomeActions.loadHome,

};

export default connect(mapStateToProps, mapAction)(ChatDisplayPort);