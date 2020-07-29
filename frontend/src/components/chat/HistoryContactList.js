import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {displayDate} from "../../helpers/util";
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function HistoryContactList(props) {

    return <React.Fragment>
        <List direction="column" style={{height:'calc(84vh)'}}>
            {
                props.order.map((ele) => {
                    return<React.Fragment>
                    <ListItem>
                    <Grid container direction="row" justify='space-between'>
                        <Grid item>
                           <Contact chatter={ele} displayName={true} online={true}/>
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