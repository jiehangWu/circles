import React from "react";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            repeatedPassword: "",
            submitted: false,
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
        this.setState({submitted: true});
        if (this.state.username
            && this.state.password
            && this.state.repeatedPassword
            && this.state.password === this.state.repeatedPassword) {
            this.props.register(this.state.username, this.state.password);
        }
    };

    render() {
        const {username, password, repeatedPassword, submitted} = this.state;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Register</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={"form-group" + (submitted && !username) ? " has-error" : ""}>
                                    <label htmlFor="username" className="mt-2">Username</label>
                                    <input type="text" className="form-control" name="username"
                                           onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !username && <div className="text-danger">Username is required</div>}
                                </div>
                                <div className={"form-group" + (submitted && !password) ? " has-error" : ""}>
                                    <label htmlFor="password" className="mt-2">Password</label>
                                    <input type="password" className="form-control" name="password"
                                           onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !password && <div className="text-danger">Password is required</div>}
                                </div>
                                <div
                                    className={"form-group" + (submitted && (!repeatedPassword || (password !== repeatedPassword))) ? " has-error" : ""}>
                                    <label htmlFor="repeatedPassword" className="mt-2">Repeat password</label>
                                    <input type="password" className="form-control" name="repeatedPassword"
                                           onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !password && <div className="text-danger">Password is required</div>}
                                    <div className="invalid-feedback">
                                        Password is required
                                    </div>
                                    {submitted && password !== repeatedPassword &&
                                    <div className="text-danger">Password is not the same</div>}
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary my-3">Register</button>
                                    <Link to="login" className="btn btn-link">Cancel</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapAction = {
    register: userActions.register,
};

export default RegisterForm = connect(null, mapAction)(RegisterForm);