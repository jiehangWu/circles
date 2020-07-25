import Grid from "@material-ui/core/Grid";
import React from "react";
import ContactList from "./ContactList";
import HistoryContactList from "./HistoryContactList";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import InputArea from "./InputArea";
import {HomeActions} from "../../actions/home.actions";
import ChatDisplayPort from "./ChatDisplayPort";
import ChatPanel from "./ChatPanel";


export function ChatPage2(props) {

    return <React.Fragment>
        <div>

        <div style={{ marginLeft: '0.9%', width: "99%",backgroundColor: "#9B59B6", color: 'white', display:'flex',height:'calc(5vh)'}} >
            <div className="mx-2 my-1" style={{fontSize: "large"}}> Circles Chat</div>
        </div>
        <Grid container direction="row" alignItems="flex-start" style = {{}}>
            <Grid item className="" style={{marginLeft: '1%', width: '29%',height: '100%'}}>
                <Paper style={{background: "white"}} >
                    <ChatPanel/>
                </Paper>
            </Grid>

            <Grid item className="" style={{ marginLeft: '1%', width: '69%'}}>

                <Paper style={{background: "white"}}>
                    <ChatDisplayPort/>
                </Paper>
                <Paper className="" style={{background: "#F5F5F5"}}>
                    <InputArea/>
                </Paper>
            </Grid>
        </Grid>
        </div>
    </React.Fragment>
}

const mapStateToProps = (state) => {
    return {
        chats: state.chats,
        person: state.currentChatPerson,
        username: state.userinfo.username
    };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, mapAction)(ChatPage2);