import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "./components/entrance/RegisterForm";
import LoginForm from "./components/entrance/LoginForm";
import {history} from "./helpers/history";
import {connect, Provider} from "react-redux";
import {Redirect, Route, Switch, Router} from "react-router-dom"
import Home from "./components/home/Home";
import {PrivateRoute} from "./helpers/PrivateRouter";

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearMessage();
        });
    }

    render() {
        const {message} = this.props;
        return (
            <React.Fragment>
                {alert.message &&
                <div className={`alert ${message.type}`}>{message.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={LoginForm}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/home" component={Home}/>
                        <Redirect from="*" to="/login"/>
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

const mapState = (state) => {
    return {message: state.message};
};

const mapDispatch = (dispatch) => {
    return {
        clearMessage: () => {
            dispatch({type: "CLEAR_MESSAGE"})
        }
    };
};

export default connect(mapState, mapDispatch)(App);