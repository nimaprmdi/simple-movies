import React, { Component } from "react";
import Joi from "joi";
import Input from "./Input";
import Select from "./Select";

/* Helper Functions */

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const options = { abortEarly: true };

        const { error } = this.schema.validate(this.data, options);

        if (!error) return null;
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    };

    validateProperty = ({ name, value }, schema) => {
        const obj = { [name]: value };
        const schemaOfProperty = Joi.object({ [name]: schema.extract(name) });

        const { error } = schemaOfProperty.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorsMessage = this.validateProperty(input, this.schema);
        if (errorsMessage) errors[input.name] = errorsMessage;
        else delete errors[input.name];

        const dataClone = { ...this.state.data };
        dataClone[input.name] = input.value;

        this.setState({ data: dataClone, errors });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleSelectChange = (e, name, data, setData, allErrors, setAllErrors, schema) => {
        e.preventDefault();

        const errors = { ...allErrors };

        let input = {
            name: e.currentTarget.name,
            value: e.currentTarget.value === null ? null : JSON.parse(e.currentTarget.value),
        };

        const errorsMessage = this.validateProperty(input, schema);
        if (errorsMessage) errors[e.currentTarget.name] = errorsMessage;
        else delete errors[e.currentTarget.name];

        const dataClone = { ...data };

        dataClone[name] = input.value;

        setData(dataClone);

        setAllErrors(errors);
    };

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                value={data[name] || ""}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    renderButton = (label) => {
        return (
            <button disabled={Object.keys(this.state.errors).length > 0} className="btn btn-primary">
                {label}
            </button>
        );
    };

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };
}

export default Form;
