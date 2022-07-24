import React, { useRef, useState } from "react";
import Input from "./common/Input";

const LoginForm = () => {
    const [account, setAccount] = useState({
        username: "",
        password: "",
    });

    const [allErrors, setAllErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (account.username.trim() === "") errors.username = "Username is empty";

        if (account.password.trim() === "") errors.password = "Password is Empty";

        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        setAllErrors(errors || {});
        if (errors) return;
    };

    //
    const validateProperty = ({ name, value }) => {
        if (name === "username") {
            if (value.trim() === "") return "Username is empty";
        }

        if (name === "password") {
            if (value.trim() === "") return "Password is empty";
        }
    };

    const handleChange = ({ currentTarget: input }) => {
        const errors = { ...allErrors };
        const errorMessage = validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const accountClone = { ...account };
        accountClone[input.name] = input.value;
        setAccount(accountClone);
        setAllErrors(errors);
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                    name="username"
                    value={account.username}
                    label="Username"
                    onChange={(e) => handleChange(e)}
                    error={allErrors.username}
                />

                <Input
                    name="password"
                    allErrors
                    value={account.password}
                    label="Password"
                    onChange={(e) => handleChange(e)}
                    error={allErrors.password}
                />

                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
