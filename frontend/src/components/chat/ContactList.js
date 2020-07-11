import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import Avatar from '@material-ui/core/Avatar';
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Message from "./message";

function ContactList(props) {

    useEffect(()=>{
        console.log(props.chatsReducer);
    },[]);

    return <React.Fragment>
    <Grid container direction="column" alignItems="flex-start">
        {
            props.order.map((ele) => {
                return <Contact name={ele} displayName={true} online = {true}/>;
            })
        }
    </Grid>
    </React.Fragment>

}

const mapStateToProps = (state) => {
    return {order: state.chatsListReducer,
    person: state.currentChatPerson};
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, mapAction)(ContactList);