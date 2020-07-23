import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import React, {useEffect, useState} from "react";
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";

function ContactList(props) {

    useEffect(() => {
        console.log(props.chatsReducer);
    }, []);

    return <React.Fragment>
        <Grid container direction="column" alignItems="flex-start" >
            {
                props.order.map((ele) => {
                    return <Grid item>
                        <Contact chatter={ele} displayName={true} online={true}/>
                    </Grid>
                })
            }
        </Grid>
    </React.Fragment>

}

const mapStateToProps = (state) => {
    return {
        order: state.chatsListReducer,
        person: state.currentChatPerson,
        chatsReducer1: state.chatsReducer1,
    };
};

export default connect(mapStateToProps, {})(ContactList);