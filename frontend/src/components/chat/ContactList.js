import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import React, {useEffect, useState} from "react";
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {displayDate} from "../../helpers/util";
import {Divider} from "@material-ui/core";

function ContactList(props) {

    useEffect(() => {
        // console.log(props.chatsReducer);
    }, []);


    function findData(ele) {
        let data = props.order.find((item) => item.userId === ele.userId);
        return data;
    }

    return <React.Fragment>
        <List container direction="column" alignItems="flex-start" style={{height:'calc(89vh)'}}>
            {
                props.orderOnline.map((ele) => {
                    return<React.Fragment>
                        <ListItem>
                            <Grid container direction="row" justify='space-between'>
                                <Grid item>
                                    <Contact chatter={findData(ele) !== undefined? findData(ele):ele} displayName={true} online={true}/>
                                </Grid>
                                <Grid item style={{alignSelf: 'flex-end'}}>
                                    <Grid container direction='row-reverse'>
                                        <div style={{color:'#aab7b8',fontSize:'0.8rem'}} className="mr-2">
                                            {
                                                findData(ele) !== undefined? displayDate(findData(ele).dateStr):""
                                            }
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
        orderOnline: state.chatsListReducer,
        person: state.currentChatPerson,
        chatsReducer1: state.chatsReducer1,
    };
};

export default connect(mapStateToProps, {})(ContactList);