import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { history } from "../../helpers/history";
import SocketComponent from "./SocketComponent";
import MessageList from "./MessageList";
import { ChatActions } from "../../actions/chat.actions";
//@material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, blueGrey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: 160,
            flexShrink: 0,
        }
    },
    innerDrawer: {
        [theme.breakpoints.up('xl')]: {
            width: 150,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: 150,
        backgroundColor: blueGrey[50]
    },
    innerdrawerPaper: {
        width: 950,
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
    },
    chatHistory: {
        width: '53ch',
        maxWidth: '53ch',
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        maxWidth: '120ch',
        height: '7.88ch'
    },
    inline: {
        display: 'inline',
    }

}));

const ChatPage = (props) => {
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
            <div className={classes.toolbar} />
            <Avatar aria-label="profile-pic" className={classes.logo}>
                假装logo
            </Avatar>
            {name}
            <IconButton color='primary'>
                <AccountCircleIcon onClick={() => history.push('./profile')} />
            </IconButton>
            <IconButton color='primary'>
                <SettingsIcon />
            </IconButton>
        </div>
    );

    const previousTalk = (
        <List className={classes.chatHistory}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                God Wu
                  </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Brother Fan
                  </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Oui Oui"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Master Xiaobo
                  </Typography>
                            {' — Do you have Paris recommendations? Have you ever…'}

                        </React.Fragment>
                    }
                />
            </ListItem>

        </List>
    );

    const chatWindow = (<div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Chat with user.1
            </Typography>
            </Toolbar>
        </AppBar>

        <main className={classes.content}>
            <div className={classes.toolbar} />
            <MessageList />
        </main>
    </div>);

    useEffect(() => {
        props.loadChats();
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

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="flex-start"
                    justify="flex-start"
                    wrap="reverse"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={4}>
                        {previousTalk}
                    </Grid>

                </Grid>



                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.innerdrawerPaper,
                    }}
                    alignItems="flex-end"
                    justify="flex-end"
                    anchor="right"
                >
                    {/* <MessageList/> */}
                    {chatWindow}


                </Drawer>

                <switch>

                    <Route exact path="/chat">
                    </Route>

                </switch>

            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.users,
        messages: state.messages
    };
};

const mapAction = {
    loadChats: ChatActions.loadAllChats,
};

export default connect(mapStateToProps, mapAction)(ChatPage);


