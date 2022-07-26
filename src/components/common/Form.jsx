import React from "react";
import Joi from "joi";
import Input from "./Input";

/* Helper Functions */

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

const handleSelectChange = (e, name, data, setData, allErrors, setAllErrors, schema) => {
    e.preventDefault();

    const errors = { ...allErrors };

    console.log("json parse", JSON.parse(e.currentTarget.value));

    let input = {
        name: e.currentTarget.name,
        value: e.currentTarget.value === null ? null : JSON.parse(e.currentTarget.value),
    };

    const errorsMessage = validateProperty(input, schema);
    if (errorsMessage) errors[e.currentTarget.name] = errorsMessage;
    else delete errors[e.currentTarget.name];

    const dataClone = { ...data };

    dataClone[name] = input.value;

    setData(dataClone);

    console.log(errors);
    setAllErrors(errors);
};

/* Input Handlers */
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

    return (
        <button disabled={error} className="btn btn-primary bt-lg">
            {label}
        </button>
    );
};

const renderSelect = (name, label, data, setData, allErrors, setAllErrors, genres, schema, defaultValue = null) => {
    return (
        <>
            <div className="input-group mb-3  mt-4">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor={name}>
                        {label}
                    </label>
                </div>

                <select
                    name={name}
                    className="custom-select"
                    onChange={(e) => handleSelectChange(e, name, data, setData, allErrors, setAllErrors, schema)}
                    id={name}
                    defaultValue={defaultValue}
                >
                    <option value={JSON.stringify({})}>Select Genre</option>
                    {genres.map((genre) => (
                        <option key={genre._id} value={JSON.stringify(genre)}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            {allErrors[name] && <div className="alert alert-danger d-block">{allErrors[name]}</div>}
        </>
    );
};

/* Exports */

export { validate, validateProperty, handleChange, handleSubmit, renderInput, renderButton, renderSelect };
