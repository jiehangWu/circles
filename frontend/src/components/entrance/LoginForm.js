import React from "react";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitted: false
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true,
        });
        if (this.state.username && this.state.password) {
            this.props.login(this.state.username, this.state.password);
        }

        // if ( password match) todo {}
        this.props.onRouteChange('home');
    };

    render() {
        const {username, password, submitted} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username"
                               onChange={e => this.handleChange(e)}/>
                        {submitted && !username && <div className="text-danger">Username is required</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password"
                               onChange={e => this.handleChange(e)}/>
                        {submitted && !password && <div className="text-danger">Password is required</div>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary my-3">Login</button>
                        <Link to="register" className="btn btn-link">Register</Link> 
                    </div>
                </form>
            </div>
        )
    }
}

const mapAction = {
    login: userActions.login,
};

export default connect(null, mapAction)(LoginForm);