import React from "react";
import Joi from "joi";
import Input from "./Input";

const validate = (data, schema) => {
    const options = { abortEarly: true };

    const { error } = schema.validate(data, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
        errors[item.path[0]] = item.message;
    }

    return errors;
};

const validateProperty = ({ name, value }, schema) => {
    const obj = { [name]: value };
    const schemaOfProperty = Joi.object({ [name]: schema.extract(name) });
    const { error } = schemaOfProperty.validate(obj);
    return error ? error.details[0].message : null;
};

const handleChange = ({ currentTarget: input }, data, setData, allErrors, setAllErrors, schema) => {
    const errors = { ...allErrors };
    const errorsMessage = validateProperty(input, schema);
    if (errorsMessage) errors[input.name] = errorsMessage;
    else delete errors[input.name];

    const dataClone = { ...data };
    dataClone[input.name] = input.value;
    setData(dataClone);
    setAllErrors(errors);
};

const handleSubmit = (e, data, setAllErrors, doSubmit, schema) => {
    e.preventDefault();

    const errors = validate(data, schema);
    setAllErrors(errors || {});
    if (errors) return;

    doSubmit();
};

const renderInput = (name, label, data, setData, allErrors, setAllErrors, schema, type = "text") => {
    return (
        <Input
            name={name}
            value={data[name]}
            error={allErrors[name]}
            onChange={(e) => handleChange(e, data, setData, allErrors, setAllErrors, schema)}
            label={label}
            type={type}
        />
    );
};

const renderButton = (data, schema, label) => {
    const { error } = schema.validate(data);

    return <button className="btn btn-primary bt-lg">{label}</button>;
};

export { validate, validateProperty, handleChange, handleSubmit, renderInput, renderButton };
