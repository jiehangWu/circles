import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import React, {useEffect} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Badge from '@material-ui/core/Badge';
import {history} from "../../helpers/history";

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
    useEffect(()=> {
        },[props.contactList0, props.contactList1]);

    const messages = props.chatsReducer1[props.chatter.userId];
    const unread = props.chatter.unread;

    return <Grid item style={{display: 'flex', alignItems: 'flex-end'}} className="pl-1 pr-0 mr-0 ml-1 mb-1">
        {(unread !== undefined && unread > 0)?
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                {props.chatter.userAvatar === ''?
                    <Avatar aria-label="profile-pic" className={classes.avatar2}
                            style={(props.chatter.userId !== props.currentChatter.userId || !props.displayName) ? {backgroundColor: '#BDBDBD'} : {
                                backgroundColor: '#BDBDBD', border: '3px solid #F5B041  '
                            }}>
                        {props.chatter.username.substring(0, 2)}
                    </Avatar>:
                    <Avatar aria-label="profile-pic" className={classes.avatar2}
                            style={(props.chatter.userId !== props.currentChatter.userId || !props.displayName) ? {backgroundColor: '#BDBDBD'} : {
                                backgroundColor: '#BDBDBD', border: '3px solid #F5B041  '
                            }} src={props.chatter.userAvatar}>
                    </Avatar>
                }
            </StyledBadge>:
            props.chatter.userAvatar === ''?
                    <Avatar aria-label="profile-pic" className={classes.avatar2}
                            style={(props.chatter.userId !== props.currentChatter.userId || !props.displayName) ? {backgroundColor: '#BDBDBD'} : {
                                backgroundColor: '#BDBDBD', border: '3px solid #F5B041  '
                            }}>
                        {props.chatter.username.substring(0, 2)}
                    </Avatar>:
                    <Avatar aria-label="profile-pic" className={classes.avatar2}
                            style={(props.chatter.userId !== props.currentChatter.userId || !props.displayName) ? {backgroundColor: '#BDBDBD'} : {
                                backgroundColor: '#BDBDBD', border: '3px solid #F5B041  '
                            }} src={props.chatter.userAvatar}>
                    </Avatar>

        }
        {props.displayName ?
            <div style={{display: 'flex', flexDirection:'column', alignItems: 'top' }}>
                <div className="pr-2" style={{fontWeight: '550',
                        cursor:"pointer"
                    }} onClick={() => {
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
                    props.clickContact();
                    history.push("/home/chat/messages");
                }}>
                    {props.chatter.username}
                </div>
                <div style={{alignSelf: 'flex-start', color:'#aab7b8',fontSize:'0.9rem'}}>
                    {
                        messages!== undefined &&
                        messages[messages.length - 1] !== undefined?
                            (messages[messages.length - 1].content.length > 20?
                                (unread > 0? "(" + unread +")"+" " : '')
                                + messages[messages.length - 1].content.slice(0,20) + "..."
                                :(unread > 0? "(" + unread +")"+ " " : '')
                                + "  " + messages[messages.length - 1].content)
                            : <p> </p>
                    }
                </div>
            </div>:
            <div></div>
        }
    </Grid>;
};


const mapStateToProps = (state) => {
    return {
        username: state.userinfo.username,
        userId: state.userinfo.userId,
        currentChatter: state.currentChatPerson,
        chatsReducer1: state.chatsReducer1,
        contactList0: state.historyContactsReducer,
        contactList1: state.chatsListReducer
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
    },
    clickContact: ()=> {
        return {
            type: 'CLICK_CONTACT'
        }
    }
};


export default connect(mapStateToProps, mapAction)(Contact);