import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import React, {useEffect, useState} from "react";
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";
import {displayDate} from "../../helpers/util";
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {light} from "@material-ui/core/styles/createPalette";

function HistoryContactList(props) {

    useEffect(() => {
        console.log(props.order);
    }, []);

    return <React.Fragment>
        <List container direction="column" alignItems="flex-start" style={{height:'calc(89vh)'}}>
            {
                props.order.map((ele) => {
                    return<React.Fragment>
                    <ListItem>
                    <Grid container direction="row" justify='space-between'>
                        <Grid item>
                        <Grid container direction="row">
                        <Contact chatter={ele} displayName={true} online={true}/>
                        <div style={{alignSelf: 'flex-end', color:'#aab7b8', position:'relative', right: '25px'}}>
                            {props.chatsReducer1[ele.userId]?
                                props.chatsReducer1[ele.userId][props.chatsReducer1[ele.userId].length - 1].content.slice(0,15) + "...":''}
                        </div>
                        </Grid>
                        </Grid>
                            <Grid item style={{alignSelf: 'flex-end'}}>
                            <Grid container direction='row-reverse'>
                            <div style={{color:'#aab7b8',fontSize:'0.8rem'}} className="mr-2">
                            {ele.dateStr !== undefined?
                                displayDate(ele.dateStr):''}
                            </div>
                                </Grid>
                            </Grid>

                    </Grid>
                        </ListItem>
                        <Divider light variant="inset" />
                    </React.Fragment>
                })
            }
        </List>
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