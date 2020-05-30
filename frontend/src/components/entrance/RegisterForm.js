import React from "react";

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
            <div className="col-md-6 col-md-offset-3">
                <h2 className="align-middle">Register</h2>
                <form name="form" onSubmit={this.handleSubmit}></form>
                <div className={"form-group" + (submitted && !username) ? "has-error" : ""}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username"
                           onChange={(e) => this.handleChange(e)}/>
                    {submitted && }

                </div>


            </div>
        )


    }
}
