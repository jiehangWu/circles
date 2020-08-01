import Grid from "@material-ui/core/Grid";
import React from "react";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import InputArea from "./InputArea";
import {HomeActions} from "../../actions/home.actions";
import ChatDisplayPort from "./ChatDisplayPort";
import ChatPanel from "./ChatPanel";


export function ChatPage2(props) {

    return <React.Fragment>
        <div style = {{width: '80%'}}>

            <Grid container direction="row" alignItems="flex-start" style = {{width: '100%'}}>
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