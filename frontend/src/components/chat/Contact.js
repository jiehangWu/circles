import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";

const styles = makeStyles((theme) => ({
    avatar2: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginTop: '0.5rem',
        marginDown: '0.5rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',

    },
}));

const Contact = (props) => {
    const [chosen, setChosen] = useState(false);

    useEffect(() => {
        if (props.currentChatter === props.name) {
            setChosen(true);
        } else {
            setChosen(false)
        }
    }, [props.currentChatter])
    const classes = styles();

    return <Grid item style={{display: 'flex', alignItems: 'center'}} className="pl-1 pr-0 mr-0 ml-1 mb-1">
        <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center"
                style={(!chosen) || !props.displayName ? {backgroundColor: '#e03d38'} : {
                    backgroundColor: '#e03d38', border: '2px solid #58d68d'
                }}>
            {props.name.substring(0, 2)}
        </Avatar>
        {props.displayName ?
            <div className="pr-2" onClick={() => {
                props.switchChatter(props.name);
                setChosen(!chosen)
            }}>
                {props.name}
            </div> :
            <div></div>
        }
    </Grid>;
};


const mapStateToProps = (state) => {
    return {
        username: state.userinfo.username,
        inputChat: state.inputChatReducer,
        currentChatter: state.currentChatPerson

    };
}


const mapAction = {
    switchChatter: (person) => {
        return {
            type: "CHAT_SWITCH",
            payload: person
        }
    }
};


export default connect(mapStateToProps, mapAction)(Contact);