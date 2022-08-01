import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi";
import * as userService from "../services/userServices";

class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: "",
        },
        errors: {},
    };

    schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
        name: Joi.string().required().label("E-Mail"),
    });

    doSubmit = async () => {
        await userService.register(this.state.data);
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
