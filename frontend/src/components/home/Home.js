import React, {useEffect, useState} from "react";
import PostList from './PostList';
import InputArea from './InputArea';
import LogOutButton from "./LogOutButton";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import {blue, blueGrey} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {history} from "../../helpers/history"
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';

const drawerWidth = 180;

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
        width: theme.spacing(11), //make this bigger
        height: theme.spacing(11),
        margin: '1.1rem'
    },
    avatar2: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginTop: '0.5rem',
        marginDown: '0.5rem',
        marginLeft: '0rem',
        marginRight: '1rem',
    },
    name: {
        marginLeft: '10%',
        marginRight: '20%',
        width: '20%'
    },
   rightDrawer: {
       display: 'flex',
       flexDirection: 'column'
   },
   useCenter: {
       justifyContent: 'center'
   },
}));

const Home = (props) => {
    const classes = styles();
    const theme = useTheme();
    const name = (
        <div>
            <h4 style={{fontWeight: '900'}}>{props.username}</h4>
        </div>
    );
    const nameDetail = (<div>

        <p>@{props.username}123</p>
    </div>);

    const leftSideBar = (
        <div className={classes.background}>
            <Grid container justify="center">
                <Grid item>
                    <Avatar aria-label="profile-pic" className={classes.avatar} alignItems="center">
                        W
                    </Avatar>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item>
                    {name}
                </Grid>
            </Grid>
            <Grid container justify="center" >
                <Grid item>
                    {nameDetail}
                </Grid>
            </Grid>
            <Grid container justify="center" >
            <IconButton color='primary'>
                <AccountCircleIcon/>
            </IconButton>
            <IconButton color='primary'>
                <SettingsIcon/>
            </IconButton>
            </Grid>

        </div>
    );

    const rightSideBar = (
        <div className={classes.rightDrawer}>
            <Grid container justify="center" className="mb-5" >
                <div className="my-3">
                    Welcome to Circles!
                </div>
                <div>
                    <LogOutButton/>
                </div>
            </Grid>
            <Grid container justify="center" className="mb-2">
                <div style={{fontWeight: '800'}}>
                    <div>Active Circles</div>
                </div>
            </Grid>
            <Grid container justify="center" alignItems="center">
                {/* can be replaced by component */}
                <Grid item style = {{display: 'flex', alignItems:'center'}}>
                <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center" style = {{backgroundColor: '#e03d38'}}>
                    F
                </Avatar>
                <div>
                    Food
                </div>
                    </Grid>
                <Grid item style = {{display: 'flex', alignItems:'center'}}>
                    <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center" style = {{backgroundColor: '#4ed6d4'}}>
                        G
                    </Avatar>
                    <div>
                        Game
                    </div>
                </Grid>
                <Grid item style = {{display: 'flex', alignItems:'center'}}>
                    <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center" style = {{backgroundColor: '#278bd7'}}>
                        S
                    </Avatar>
                    <div>
                        Show
                    </div>
                </Grid>
                <Grid item style = {{display: 'flex', alignItems:'center'}}>
                    <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center" style = {{backgroundColor: '#26bb7b'}}>
                        S
                    </Avatar>
                    <div>
                        Show
                    </div>
                </Grid>
                <Grid item style = {{display: 'flex', alignItems:'center'}}>
                    <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center" style = {{backgroundColor: '#f7b650'}}>
                        S
                    </Avatar>
                    <div>
                        Show
                    </div>
                </Grid>
            </Grid>

        </div>

    );

    useEffect(() => {
        props.loadHome();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>
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
                    <InputArea/>
                    <PostList/>
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
                        {rightSideBar}
                    </Drawer>
                </div>

            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {username: state.userinfo.username};
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, mapAction)(Home);