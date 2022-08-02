import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";

export const RegisterForm = () => {
    const navigate = useNavigate();

    return <RegisterFormHandler navigate={navigate} />;
};

class RegisterFormHandler extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: "",
        },
        errors: {},
    };

    schema = Joi.object({
        username: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .label("Username"),
        password: Joi.string().required().label("Password"),
        name: Joi.string().required().label("E-Mail"),
    });

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            toast.success("Success");
            // this.props.navigate("/"); // useNaviaget inside class component
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
                toast.error(ex.response);
            }
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("name", "Name")}
                {this.renderButton("Register")}
            </form>
        );
    }
}

export default RegisterForm;
