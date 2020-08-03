import React, {useEffect, useRef} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import PostList from './PostList';
import InputArea from './InputArea';
import LogOutButton from './LogOutButton';
import {history} from "../../helpers/history"
import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";
import Profile from "../profile/Profile"
import ChatPage2 from "../chat/ChatPage2";
import {userActions} from '../../actions/user.actions';
import TabList from './CircleLists/TabList'
import {ChatActions} from "../../actions/chat.actions";
import Guidance from "./Guidance/GuidanceWindow";
import {useSnackbar} from 'notistack';
import SearchBox from './SearchBox/SearchBox'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ChatIcon from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {blue, blueGrey} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {greetUser} from '../../helpers/util';

const drawerWidth = 275;

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
        width: drawerWidth,
        backgroundColor: blueGrey[50]
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        padding: theme.spacing(3, 0, 0, 0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        margin: 'auto',
        marginTop: "2%",
        display: "flex",
        justifyContent: 'center',
    },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: "14%",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content2: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        padding: theme.spacing(3, 0, 0, 0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        margin: 'auto',
        display: "flex",
        justifyContent: 'center',
    },
    avatar: {
        backgroundColor: blue[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginLeft: '5%'
    },
    name: {
        marginLeft: '5%',
        marginRight: '20%',
        width: '20%',
        textAlign: "center"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    //   added for responsive
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(5),
    },
    hide: {
        display: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    icons: {
        marginLeft: '5%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(125),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogOutButton: {
        // position: 'absolute',
        float: "right",
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const Home = (props) => {
    const imgUpload = useRef(null);
    const classes = styles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const matches = useMediaQuery('(min-width:1200px)');
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const name = (
        <div className={classes.name}>
            <h4 style={{fontWeight: '900'}}> {props.usernameFirst}</h4>
            <h5 style={{fontWeight: '900'}}>{props.usernameIdentifier}</h5>
            <p>@{props.registerName}</p>
        </div>
    );

    const leftBarIcon = (
        <div className={classes.icons}>
            {history.location.pathname === '/home' ?
                <IconButton color='primary' onClick={() => {
                    history.push({
                        pathname: './home/profile',
                        state: {
                            homeId: props.userId,
                            self: true,
                            name: props.username
                        }
                    });
                }}>
                    <AccountCircleIcon/>
                </IconButton> :
                <IconButton color='primary' onClick={() => {
                    history.replace({
                        pathname: '/home',
                        state: {
                            homeId: props.userId,
                            self: true
                        }
                    });
                }}>
                    <HomeIcon/>
                </IconButton>}
            <IconButton color='secondary' onClick={() => {
                history.push("/home/chat");
            }}>
                <ChatIcon/>
            </IconButton>
            <IconButton onClick={props.logOut}>
                <PowerSettingsNewIcon/>
            </IconButton>
        </div>
    );

    const imageChangeHandler = () => {
        if (imgUpload.current.files[0]) {
            const data = new FormData();
            const fileName = imgUpload.current.files[0].name;
            data.append(fileName, imgUpload.current.files[0], fileName);
            props.uploadAvatar(data);
        }
    }

    const leftSideBar = (
        <div className={classes.background}>
            <IconButton onClick={() => {
                imgUpload.current.click()
            }}>
                <input className="hide" style={{display: 'none'}} type="file" ref={imgUpload}
                       onChange={imageChangeHandler}/>
                <Avatar aria-label="profile-pic" className={classes.avatar}
                        src={props.avatar}>{props.username && props.username[0]}</Avatar>
            </IconButton>
            {name}
            {leftBarIcon}

            <br></br><br></br>
            <Divider/>
            <br></br><br></br>
            <Grid container justify="center" className="mb-2">
                <div style={{fontSize: 16, fontWeight: '500'}}>
                    Explore your Circles!
                </div>
            </Grid>
            <TabList/>

        </div>
    );

    // todo better the styling here
    const Home = (
        <div className={classes.content} style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            {props.firstTimer ? <center>
                <br></br><br></br><br></br><Guidance/><br></br><br></br><br></br><br></br>
            </center> : ''}
            <InputArea/>
            <PostList/>
        </div>
    );

    const contentRouter = (
        <main
            className={history.location.pathname === '/home/chat' || history.location.pathname === '/home/chat/messages' ?
                clsx(classes.content2, {[classes.contentShift]: open,})
                : clsx(classes.content, {[classes.contentShift]: open,})}>
            {/*<switch></switch> is unrecognizable by browser*/}
            {/*<div style={{width: '100%', display: "flex",justifyContent:'center'}}>*/}
            <Route exact path="/home">
                {Home}
            </Route>
            <Route path="/home/profile" key={history.location.state
            && history.location.state.homeId}>
                <Profile/>
            </Route>
            <Route path="/home/chat">
                <ChatPage2/>
            </Route>
            <Redirect from="/home/*" to="/home"/>
            {/*</div>*/}
        </main>
    );

    const circlesAppBar = (
        <AppBar
            position={history.location.pathname === '/home/chat' || history.location.pathname === '/home/chat/messages' ? "static" : "fixed"}
            className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap>
                    {greetUser() + ', ' + 'Welcome to Circles!'}
                </Typography>


                <SearchBox/>
            </Toolbar>
        </AppBar>);


    const leftResponsiveBar = (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{paper: classes.drawerPaper,}}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            {leftSideBar}
        </Drawer>);

    const geoNavigator = navigator.geolocation;

    function updateGeolocation(position) {
        enqueueSnackbar('Circles will be updating your geolocation.', {variant: "info"});
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        props.uploadGeolocation(latitude, longitude);
        setTimeout(function () {
            enqueueSnackbar(`Successfully added geolocation!`, {variant: "success"});
        }, 1500);
    }

    function geoErr(err) {
        enqueueSnackbar('Circles will be updating your geolocation.', {variant: "info"});
        switch (err.code) {
            case 0:
                setTimeout(function () {
                    enqueueSnackbar('Failed to get geolocation' + err.message, {variant: "error"});
                }, 1000);
                break;
            case 1:// PERMISSION_DENIED
                setTimeout(function () {
                    enqueueSnackbar('Permission denied to grant Circles with your geolocation', {variant: "warning"});
                }, 1000);
                break;
            case 2:// POSITION_UNAVAILABLE
                setTimeout(function () {
                    enqueueSnackbar('Your current location is unavailable.', {variant: "warning"});
                }, 1800);
                break;
            case 3:// TIMEOUT
                setTimeout(function () {
                    enqueueSnackbar('Your current location is unavailable.', {variant: "warning"});
                }, 0);
                break;
        }
    }

    useEffect(() => {
        geoNavigator.getCurrentPosition(updateGeolocation, geoErr);
        props.loadHome();
    }, []);

    return (
        <React.Fragment>
            {circlesAppBar}
            {leftResponsiveBar}
            {contentRouter}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        sideBarName: state.userinfo.username,
        username: state.userinfo.username,
        usernameFirst: state.userinfo.usernameFirst,
        usernameIdentifier: state.userinfo.usernameIdentifier,
        registerName: state.userinfo.registerName,
        userId: state.userinfo.userId,
        avatar: state.userinfo.avatar,
        tags: state.tags,
        firstTimer: state.userinfo.firstTimer,
    };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
    uploadAvatar: userActions.uploadAvatar,
    uploadGeolocation: userActions.uploadGeolocation,
    beginChat: ChatActions.beginChat,
    logOut: userActions.logOut,
};

export default connect(mapStateToProps, mapAction)(Home);