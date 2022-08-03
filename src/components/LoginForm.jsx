import React, { Component } from "react";
import Joi from "joi";
import Form from "./common/Form";
import { login } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

export const LoginForm = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    return <LoginFormPage navigate={navigate} location={location} />;
};

class LoginFormPage extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = Joi.object({
        username: Joi.string().min(4).required().label("Username"),
        password: Joi.string().required().label("Password"),
    });

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await login(data.username, data.password);
            this.props.navigate(this.props.location.state); // Usenavigate inside class component
            // window.location = "/";
        } catch (error) {
            const errors = { ...this.state.errors };
            errors.username = error.response.data;
            this.setState({ errors });
        }
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
