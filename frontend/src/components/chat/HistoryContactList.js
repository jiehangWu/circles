import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import React, {useEffect, useState} from "react";
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";

function HistoryContactList(props) {

    useEffect(() => {
        console.log(props.chatsReducer);
    }, []);

    return <React.Fragment>
        <Grid container direction="column" alignItems="flex-start">
            {
                props.order.map((ele) => {
                    return <Contact chatter={ele} displayName={true} online={true}/>;
                })
            }
        </Grid>
    </React.Fragment>

}

const mapStateToProps = (state) => {
    return {
        order: state.historyContactsReducer,
        person: state.currentChatPerson
    };
};

export default connect(mapStateToProps, {})(HistoryContactList);