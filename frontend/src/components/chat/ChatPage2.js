import Grid from "@material-ui/core/Grid";
import React from "react";
import ContactList from "./ContactList";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import InputArea from "./InputArea";
import {HomeActions} from "../../actions/home.actions";
import ChatDisplayPort from "./ChatDisplayPort";


export function ChatPage2(props) {

    return <React.Fragment>
        <Grid container direction="row" alignItems="flex-start" style={{}}>
            <Grid item className="my-3">
                <Paper style={{background: "white"}}>
                    <ContactList/>
                </Paper>
            </Grid>
            <Grid item className="mx-3 my-3">

                <Paper style={{background: "white"}}>
                    <ChatDisplayPort/>
                </Paper>
                <Paper className="my-3" style={{background: "#F5F5F5"}}>
                    <InputArea/>
                </Paper>

            </Grid>
        </Grid>
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