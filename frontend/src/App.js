import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "./components/entrance/RegisterForm";
import LoginForm from "./components/entrance/LoginForm";
import {history} from "./helpers/history";
import Router from "react-router-dom/es/Router";
import Route from "react-router-dom/es/Route";
import {connect, Provider} from "react-redux";



class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearMessage();
        })
    }

    render() {
        const {message} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {message && <div className={'alert ' + message.type}>{message.message}</div>}
                        <switch>
                            <Router history={history}>
                                <Route path="/login" component={LoginForm}/>
                                <Route path="/register" component={RegisterForm}/>
                            </Router>
                        </switch>
                    </div>
                </div>
            </div>

        )
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
