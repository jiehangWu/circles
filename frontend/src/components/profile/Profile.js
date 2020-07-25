import React, { useEffect } from "react";
import LogOutButton from "../home/LogOutButton";
import { history } from "../../helpers/history";
import { connect } from "react-redux";
import PreferenceBar from "./PreferenceBar";
import DisplayTagArea from './DisplayTagArea';
import { ProfileActions } from "../../actions/profile.actions";
import { ChatActions } from "../../actions/chat.actions";
import PostList from './PostList';
import Loading from './Loading';
import GeoButton from './GeoButton';


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, blueGrey, grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import Box from '@material-ui/core/Box';

const drawerWidth = 150;

const styles = makeStyles((theme) => ({

    mainBox: {
        width: '100%',
        border: 5,
        borderRadius: 3,
        borderColor: blueGrey[5000],
        backgroundColor: grey[200]
    },


    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: blueGrey[50]
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        marginLeft: '8.8rem',
        width: 1100,
    },
    avatar: {
        backgroundColor: blue[500],
        width: theme.spacing(17),
        height: theme.spacing(17),
        margin: '1.1rem',
    },
    name: {
        marginLeft: '10%',
        marginRight: '20%',
        width: '20%'
    },
    logo: {
        backgroundColor: blue[900],
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: '1.1rem',
    }
}));

function wait(sec) {
    return new Promise(res => setTimeout(res, sec));
}

const Profile = (props) => {
    const idFromHome = history.location.state.homeId;
    props.loadProfile(idFromHome);
    const self = history.location.state.self;

    const loading = React.createRef();

    const classes = styles();
    const name = (
        <div className={classes.name}>
            <h4 style={{ fontWeight: '900' }}> {props.username}</h4>
            <p>@{props.username}123</p><br />
        </div>
    );

    const avatarBar = (
        <div className={classes.background}>
            <div className={classes.toolbar} />
            <center>
                <Avatar aria-label="profile-pic" className={classes.avatar}>W</Avatar>
                {name}

                <IconButton color='primary'>
                    <HomeIcon onClick={async () => {
                        loading.current.style.display = 'block';
                        await wait(3000);
                        history.go({
                            pathname: './home',
                            state: {
                                homeId: props.userId,
                                self: true
                            }
                        });
                    }} />
                </IconButton>

                <IconButton>
                    <GeoButton />
                </IconButton>
                
                <IconButton color='secondary'>
                    <ChatIcon onClick={async () => {
                        loading.current.style.display = 'block';
                        await wait(100);
                        props.beginChat({
                            username: props.username,
                            userId: props.userId
                        })
                    }} />
                </IconButton><br></br>

                <DisplayTagArea profileTags={props.tags.tags} currID={idFromHome} self={self} /><br></br>
            </center>
        </div>
    );

    useEffect(() => {
        // props.loadProfile(hixrstory.location.state.homeId);
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />

            <Loading ref={loading} />

            <div className="d-flex justify-content-center">

                <div className={classes.content}>
                    <Box color={blue} className={classes.mainBox} clone>
                        {avatarBar}
                    </Box>
                    <br></br>
                    <br></br>
                    <center>
                        <PreferenceBar self={self} />
                    </center>
                    <PostList currID={idFromHome} self={self} />
                </div>

                {/* right side bar */}
                <div className={classes.root}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="right"
                    >
                        <LogOutButton />
                    </Drawer>
                </div>

            </div>
        </React.Fragment>
    );
};


const mapStateToProps = (state) => {
    return {
        username: state.userinfo.profileUsername,
        prevId: state.userinfo.prevId,
        userId: state.userinfo.profileUserId,
        tags: state.tags,
        posts: state.posts
    };
};

const mapAction = {
    loadProfile: ProfileActions.loadProfile,
    chatSwitch: (chatter) => {
        return {
            type: "CHAT_SWITCH",
            payload: chatter
        }
    },
    historyAddContact: (chatter) => {
        return {
            type: 'HISTORY_CONTACTS_ADD_CONTACT',
            payload: chatter
        }
    },
    addChat: (chatter) => {
        return {
            type: 'ADD_ONE_CONTACT',
            payload: chatter
        }
    },
    beginChat: ChatActions.beginChat,
};

export default connect(mapStateToProps, mapAction)(Profile);