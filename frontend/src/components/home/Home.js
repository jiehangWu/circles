import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import PostList from './PostList';
import CirclesList from './CirclesList';
import InputArea from './InputArea';
import LogOutButton from './LogOutButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, blueGrey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { history } from "../../helpers/history"
import { HomeActions } from "../../actions/home.actions";
import { connect } from "react-redux";
import Profile from "../profile/Profile"
import SocketComponent from '../chat/SocketComponent'
import ContactList from "../chat/ContactList";
import LoginForm from "../entrance/LoginForm";
import { PrivateRoute } from "../../helpers/PrivateRouter";
import ChatPage2 from "../chat/ChatPage2";

const drawerWidth = 150;

const styles = makeStyles((theme) => ({
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
<<<<<<< HEAD
        backgroundColor: theme.palette.background.default,
        width: 666,
=======
        //backgroundColor: theme.palette.background.default,
        backgroundColor: 'white',
>>>>>>> origin/qxb7_15chats
        padding: theme.spacing(3),
    },
    avatar: {
        backgroundColor: blue[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: '1.1rem',
    },
    name: {
        marginLeft: '10%',
        marginRight: '20%',
        width: '20%'
    }
}));

const Home = (props) => {
    const classes = styles();
    const theme = useTheme();
    const name = (
        <div className={classes.name}>
            <h4 style={{ fontWeight: '900' }}> {props.username}</h4>
            <p>@{props.username}123</p><br />
        </div>
    );

    const leftSideBar = (
        <div className={classes.background}>
<<<<<<< HEAD
            {/* <SocketComponent /> */}
=======
            {/*<SocketComponent />*/}
>>>>>>> origin/qxb7_15chats
            <div className={classes.toolbar} />
            <Avatar aria-label="profile-pic" className={classes.avatar}>
                W
			</Avatar>
            {name}
            <IconButton color='primary' to="/home/profile" onClick={ 
                async () => {
                    // no need to passID since it must be profile of myself
                    // props.passId(props.userId); history.push('./profile')
                    history.replace({
                        pathname: './home/profile',
                        state: {
                            homeId: props.userId,
                            self: true
                        }
                    });
                }
            }>
                <AccountCircleIcon />
            </IconButton>
            <IconButton color='primary'>
                <SettingsIcon />
            </IconButton>
        </div>
    );

    const ProfilePage = (<div>
        <Profile />
    </div>)

    const Home = (
        <div className={classes.content}>
            <InputArea />
            <PostList />
        </div>
    );

    useEffect(() => {
        props.loadHome();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <div className="d-flex justify-content-center">
                {/* left side bar */}
                <div className={classes.root}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        {leftSideBar}
                    </Drawer>
                </div>

                <switch>
                    <Route exact path="/home">
                        {Home}
                    </Route>

                    <Route exact path="/home/profile">
                        {ProfilePage}
                    </Route>


                    <Route path="/home/chat">
                        <ChatPage2 />
                    </Route>
                    <Redirect from ="/home/*"  to="/home" /> 

                </switch>

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
                        <CirclesList />
                    </Drawer>
                </div>

            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.userinfo.username,
        userId: state.userinfo.userId,
        tags: state.tags
    };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, mapAction)(Home);