import React from "react";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Particles from 'react-particles-js';
import CryptoJs from 'crypto-js';

const styles = {
    particles: {
        position: "fixed",
        top: "-52%",
        right: 0,
        bottom: 0,
        left: 0,
    }
};

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
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            },
            modes: {
                "grab": {
                    distance: 50000,
                    line_linked: {
                        opacity: 1,
                        width: 500
                    }
                },
            },
            retina_detect: true
        }
    }
};


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
        if (this.state.registerName && this.state.password) {
            const ciphertext = CryptoJs.MD5(this.state.password).toString();
            this.props.login(this.state.registerName, ciphertext);
        }
    };

    render() {
        const {registerName, password, submitted} = this.state;
        const {message} = this.props;
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
                            <h2>Login</h2>
                            <form name="form" onSubmit={e => this.handleSubmit(e)}>
                                <div className="form-group mb-3">
                                    <label htmlFor="registerName">Username</label>
                                    <input type="text" className="form-control" name="registerName"
                                           onChange={e => this.handleChange(e)}/>
                                    {submitted && !registerName &&
                                    <div className="text-danger">Username is required</div>}
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
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {message: state.message};
};


const mapAction = {
    login: userActions.login,
};

export default connect(mapState, mapAction)(LoginForm);