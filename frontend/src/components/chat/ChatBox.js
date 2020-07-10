import React, { useEffect, useState } from "./node_modules/react";
import { makeStyles } from './node_modules/@material-ui/core/styles';
import Drawer from './node_modules/@material-ui/core/Drawer';
import CssBaseline from './node_modules/@material-ui/core/CssBaseline';
import AppBar from './node_modules/@material-ui/core/AppBar';
import Toolbar from './node_modules/@material-ui/core/Toolbar';
import List from './node_modules/@material-ui/core/List';
import Typography from './node_modules/@material-ui/core/Typography';

import { blue, blueGrey } from './node_modules/@material-ui/core/colors';
import Message from './message';
const drawerWidth = 240;

class ChatWindow extends React.Component {

  classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
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
      width: 1200,
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
      width: '100%',
      maxWidth: '88ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

  renter() {
    return (
      <div className={this.classes.root}>
        <Drawer
          className={this.classes.drawer}
          variant="permanent"
          classes={{
            paper: this.classes.innerdrawerPaper,
          }}
          alignItems="flex-end"
          justify="flex-end"
          anchor="right"
        >
          <div className={this.classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={this.classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                  Chat with daddy
        </Typography>
              </Toolbar>
            </AppBar>

            <main className={this.classes.content}>
              <div className={this.classes.toolbar} />
              <Message />

            </main>
          </div>
          {/* <chatWindow/> */}
          {/* <InputArea/> */}
        </Drawer>
      </div>

    )
  }
}

export default ChatWindow;