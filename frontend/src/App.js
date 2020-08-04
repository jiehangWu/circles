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

class App extends React.Component {
	constructor(props) {
		super(props);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		history.listen((location, action) => {
			this.props.clearMessage();
		});
	}
    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.setWidth(window.innerWidth);
        this.props.setHeight(window.innerHeight);
	}

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    updateWindowDimensions() {
	    this.props.setWidth(window.innerWidth);
	    this.props.setHeight(window.innerHeight);
	}

    render() {
        const { message } = this.props;
        return (
            <React.Fragment>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={LoginForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/home" component={Home} />
                        <Route path="/profile" component={Profile} />
                        <Redirect from="*" to="/login" />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

const mapDispatch = (dispatch) => {
	return {
		clearMessage: () => {
			dispatch({ type: 'CLEAR_MESSAGE' });
		},
        setWidth: (width)=> {
		    dispatch({
                type: 'SET_WIDTH',
                payload: width
            })
        },
        setHeight: (width)=> {
            dispatch({
                type: 'SET_HEIGHT',
                payload: width
            })
        },
	};
};



export default connect(null, mapDispatch)(App);