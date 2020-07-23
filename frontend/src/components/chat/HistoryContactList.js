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
        <Grid container direction="column" alignItems="flex-start" style={{height:'calc(94vh)'}}>
            {
                props.order.map((ele) => {
                    return <Grid item style={{display:'flex'}}>
                        <Contact chatter={ele} displayName={true} online={true}/>
                        <div>
                            {props.chatsReducer1[ele.userId]?
                                props.chatsReducer1[ele.userId][props.chatsReducer1[ele.userId].length - 1].content:''}
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </React.Fragment>

}

const mapStateToProps = (state) => {
    return {
        order: state.historyContactsReducer,
        person: state.currentChatPerson,
        chatsReducer1: state.chatsReducer1,
    };
};

export default connect(mapStateToProps, {})(HistoryContactList);