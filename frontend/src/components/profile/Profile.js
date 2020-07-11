import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
// import PostList from './PostList';
import InputArea from './InputArea';
import LogOutButton from "./LogOutButton";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, blueGrey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { history } from "../../helpers/history"
import { HomeActions } from "../../actions/home.actions";
import { connect } from "react-redux";

import PreferenceBar from "./PreferenceBar";
import Display from './DisplayTagArea';
import InputTagArea from './InputTagArea';
import ReactDOM from "react-dom";

import Box from '@material-ui/core/Box';
import "./profile.css";

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
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
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

const Profile = (props) => {
    const classes = styles();
    const theme = useTheme();
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
                <Avatar aria-label="profile-pic" className={classes.avatar}>
                    W
                </Avatar>
                {name}

                <IconButton color='primary'>
                    <HomeIcon />
                    <Link to="home" className="btn btn-link"></Link>
                </IconButton>

                <IconButton>
                    <SettingsIcon />
                </IconButton>

                <IconButton color='secondary'>
                    <ChatIcon />
                    <Link to="chat" className="btn btn-link"></Link>
                </IconButton>


                <br></br>
                <Display />
                <br></br>
            </center>
        </div>
    );

    const leftSideBar = (
        <div className={classes.background}>
            <div className={classes.toolbar} />
            <Avatar aria-label="profile-pic" className={classes.logo}>
            </Avatar>
            {name}
            <IconButton color='primary'>
                <AccountCircleIcon />
            </IconButton>
            <IconButton color='primary'>
                <SettingsIcon />
            </IconButton>
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


                <div className={classes.content}>

                    <Box color={blue} className='main-box' clone>
                        {avatarBar}
                    </Box>
                    <br></br>
                    <br></br>
                    <center>
                        {/* <InputTagArea/> */}
                        <PreferenceBar />
                    </center>
                    <InputArea/>
                    {/* <PostList /> */}
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
    return { username: state.userinfo.username };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, mapAction)(Profile);