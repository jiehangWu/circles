import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "./components/entrance/RegisterForm";
import LoginForm from "./components/entrance/LoginForm";
import { history } from "./helpers/history";
import { connect, Provider } from "react-redux";
import { Redirect, Route, Switch, Router } from "react-router-dom"
import Home from "./components/home/Home";
import { PrivateRoute } from "./helpers/PrivateRouter";


import Profile from "./components/profile/Profile";
import ChatPage from "./components/chat/ChatPage";
import responsiveDrawer from './components/chat/ChatBox';

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearMessage();
        });
    }

    render() {
        const { message } = this.props;
        return (
            //   <Profile/>
            <ChatPage />
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        clearMessage: () => {
            dispatch({ type: "CLEAR_MESSAGE" })
        }
    };
};

export default connect(null, mapDispatch)(App);