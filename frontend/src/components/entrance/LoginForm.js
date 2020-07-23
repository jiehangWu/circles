import React from "react";
import { userActions } from "../../actions/user.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { history } from "../../helpers/history"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: "",
            password: "",
            submitted: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true,
        });
        if (this.state.registerName && this.state.password) {
            this.props.login(this.state.registerName, this.state.password);
        }
    };

    render() {
        const { registerName, password, submitted } = this.state;
        const { message } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {message.message &&
                            <div className={`alert ${message.type}`}>{message.message}</div>
                        }
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Login</h2>
                            <form name="form" onSubmit={e => this.handleSubmit(e)}>
                                <div className="form-group mb-3">
                                    <label htmlFor="registerName">Username</label>
                                    <input type="text" className="form-control" name="registerName"
                                        onChange={e => this.handleChange(e)} />
                                    {submitted && !registerName && <div className="text-danger">Username is required</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"
                                        onChange={e => this.handleChange(e)} />
                                    {submitted && !password && <div className="text-danger">Password is required</div>}
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary my-3">Login</button>
                                    <Link to="register" className="btn btn-link">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return { message: state.message };
};


const mapAction = {
    login: userActions.login,
};

export default connect(mapState, mapAction)(LoginForm);