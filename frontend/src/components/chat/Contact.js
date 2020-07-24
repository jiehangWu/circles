import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {currentChatPerson} from "../../reducers/chat.currentChatPerson1";
import Badge from '@material-ui/core/Badge';

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

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: 'red',
        color: 'red',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const Contact = (props) => {
    const classes = styles();

    return <Grid item style={{display: 'flex', alignItems: 'center'}} className="pl-1 pr-0 mr-0 ml-1 mb-1">
        {(props.chatter.read !== undefined && props.chatter.read === false)?
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
            <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center"
                    style={(props.chatter.userId !== props.currentChatter.userId || !props.displayName) ? {backgroundColor: '#BDBDBD'} : {
                        backgroundColor: '#BDBDBD', border: '3px solid #F5B041  '
                    }}>
                {props.chatter.username.substring(0, 2)}
            </Avatar>
            </StyledBadge>:
            <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center"
            style={(props.chatter.userId !== props.currentChatter.userId || !props.displayName) ? {backgroundColor: '#BDBDBD'} : {
            backgroundColor: '#BDBDBD', border: '3px solid #F5B041  '
        }}>
        {props.chatter.username.substring(0, 2)}
            </Avatar>

        }
        {props.displayName ?
            <div className="pr-2" style={{fontWeight: '550', position:'relative', bottom:'2px'}} onClick={() => {
                props.switchChatter(props.chatter);
                props.clientSetRead({
                    purpose: "CLIENT_SET_READ",
                    payload: {
                        setUserId:props.userId,
                        userId2:props.chatter.userId,
                        bool:true,
                    }
                });
                props.localSetRead(props.chatter.userId);
                props.historySetRead(props.chatter.userId);
            }}>
                {props.chatter.username}
            </div> :
            <div></div>
        }
    </Grid>;
};


const mapStateToProps = (state) => {
    return {
        username: state.userinfo.username,
        userId: state.userinfo.userId,
        currentChatter: state.currentChatPerson
    };
}


const mapAction = {
    switchChatter: (person) => {
        return {
            type: "CHAT_SWITCH",
            payload: person
        }
    },
    clientSetRead: (chat)=> {
        return {
            type: 'CLIENT_SET_READ',
            payload: chat
        }
    },
    localSetRead: (userId)=> {
        return {
            type: 'LOCAL_SET_READ',
            payload: userId
        }
    },
    historySetRead: (userId)=> {
        return {
            type: 'HISTORY_CONTACTS_SET_READ',
            payload: userId
        }
    }
};


export default connect(mapStateToProps, mapAction)(Contact);