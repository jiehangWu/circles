import React from "react";
import { userActions } from "../../actions/user.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { history } from "../../helpers/history";
import CryptoJs from 'crypto-js';
import Particles from 'react-particles-js';

const styles = {
    particles: {
        position: "fixed",
        top: "-45%",
        right: 0,
        bottom: 0,
        left: 0,
    }
}

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 150
            },
        },
        line_linked: {
            color: "#778899",
            distance: 150,
            opacity: 0.75,
            width: 1
        },
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: "",
            password: "",
            repeatedPassword: "",
            submitted: false,
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
        this.setState({ submitted: true });
        if (this.state.registerName
            && this.state.password
            && this.state.repeatedPassword
            && this.state.password === this.state.repeatedPassword) {
            const ciphertext = CryptoJs.MD5(this.state.password).toString();
            console.log(ciphertext);
            this.props.register(this.state.registerName, ciphertext);
        }
    };

    render() {
        const { registerName, password, repeatedPassword, submitted } = this.state;
        const { message } = this.props;
        return (
            <div className="jumbotron">
                <Particles className='particles'
                    params={particlesOptions}
                    style={styles.particles}
                />
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {message.message &&
                            <div className={`alert ${message.type}`}>{message.message}</div>
                        }
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Register</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={"form-group" + (submitted && !registerName) ? " has-error" : ""}>
                                    <label htmlFor="registerName" className="mt-2">Username</label>
                                    <input type="text" className="form-control" name="registerName"
                                        onChange={(e) => this.handleChange(e)} />
                                    {submitted && !registerName && <div className="text-danger">Username is required</div>}
                                </div>
                                <div className={"form-group" + (submitted && !password) ? " has-error" : ""}>
                                    <label htmlFor="password" className="mt-2">Password</label>
                                    <input type="password" className="form-control" name="password"
                                        onChange={(e) => this.handleChange(e)} />
                                    {submitted && !password && <div className="text-danger">Password is required</div>}
                                </div>
                                <div
                                    className={"form-group" + (submitted && (!repeatedPassword || (password !== repeatedPassword))) ? " has-error" : ""}>
                                    <label htmlFor="repeatedPassword" className="mt-2">Repeat password</label>
                                    <input type="password" className="form-control" name="repeatedPassword"
                                        onChange={(e) => this.handleChange(e)} />
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

const mapState = (state) => {
    return { message: state.message };
};

const mapAction = {
    register: userActions.register,
};

export default RegisterForm = connect(mapState, mapAction)(RegisterForm);