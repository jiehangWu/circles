import React, { useEffect } from 'react';
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
import ChatPage2 from "../chat/ChatPage2";
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 200;

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
    rightDrawerPaper: {
        width: 200,
        backgroundColor: blueGrey[50]
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        width: 666,
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
    const name = (
        <div className={classes.name}>
            <h4 style={{ fontWeight: '900' }}> {props.username}</h4>
            <p>@{props.username}123</p><br />
        </div>
    );

    const buttonAtBar = (history.location.pathname === '/home' ?
        (<IconButton color='primary' onClick={
            () => {
                history.push({
                    pathname: './home/profile',
                    state: {
                        homeId: props.userId,
                        self: true
                    }
                });
            }
        }>
            <AccountCircleIcon />
        </IconButton>) :
        (<IconButton color='primary' onClick={
            () => {
                history.go({
                    pathname: './home',
                    state: {
                        homeId: props.userId,
                        self: true
                    }
                });
            }
        }>
            <HomeIcon />
        </IconButton> )
    );


    const leftSideBar = (
        <div className={classes.background}>
            <SocketComponent />
            <div className={classes.toolbar} />

            <Avatar aria-label="profile-pic" className={classes.avatar}>W</Avatar>
            {name}

            {buttonAtBar}

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

    const rightBar = (history.location.pathname === '/home/chat' ? <div></div> : (
        <div className={classes.root}>
            <div>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.rightDrawerPaper,
                    }}
                    anchor="right"
                >
                    <br></br>
                    <LogOutButton />
                    <br></br>
                    <br></br>
                    <Grid container justify="center" className="mb-5">
                        <div style={{ fontSize: 16, fontWeight: '800' }}>
                            Explore your Circles!
                        </div>
                    </Grid>

                    <CirclesList />
                </Drawer>
            </div>
        </div>)
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

                <switch style={history.location.pathname === '/home' ? {} : { width: '100%' }}>
                    <Route exact path="/home">
                        {Home}
                    </Route>

                    <Route exact path="/home/profile">
                        {ProfilePage}
                    </Route>

                    <Route exact path="/home/chat">
                        <ChatPage2 />
                    </Route>

                    <Redirect from="/home/*" to="/home" />

                </switch>

                {rightBar}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        sideBarName: state.userinfo.username,
        username: state.userinfo.username,
        userId: state.userinfo.userId,
        tags: state.tags
    };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, mapAction)(Home);